<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/commain' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click='addrolesboo = true'>添加角色</el-button>

      <el-table :data="rolesList" border style="width: 100%;margin-top: 20px;">
        <!-- 展开菜单 -->
        <el-table-column type='expand'>
          <template slot-scope="scope">
            <el-row v-for="(n,index) in scope.row.children" :key="n.id" :class="['onerow',index===0?'onerow1':'']">
              <el-col :span="6">
                <el-tag closable @close='removeroles(scope.row,n.id)'>{{n.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(n1,index) in n.children" :key="n1.id" :class="[index===0?'':'tworow']">
                  <el-col :span="8">
                    <el-tag closable type="success" @close='removeroles(scope.row,n1.id)'>{{n1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag closable  @close='removeroles(scope.row,n2.id)' type="warning" v-for="n2 in n1.children" :key="n2.id">{{n2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>{{scope.row}}</pre>

          </template>
        </el-table-column>
        <el-table-column type='index'>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名" width="250">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="250">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- el-tooltip给按钮配置文字， enterable鼠标能否进入文字区域-->
            <el-tooltip class="item" effect="dark" content="修改角色" placement="top" :enterable="false">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateroleslow(scope.row.id)">编辑</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delroleslow(scope.row.id)">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" size="mini">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加角色 -->
      <el-dialog title="添加角色" :visible.sync="addrolesboo" width="30%" @close='closeaddroles'>
        <el-form :model="addroles" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="addroles.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addroles.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addrolesboo = false">取 消</el-button>
          <el-button type="primary" @click="addrolesfun">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改角色的对话框 -->
      <el-dialog title="修改角色" :visible.sync="updatarolesboo" width="30%">
        <el-form ref="updater" :model="updataroless" label-width="80px" :rules="rules">
          <el-form-item label="角色名" prop='roleName'>
            <el-input v-model="updataroless.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop='roleDesc'>
            <el-input v-model="updataroless.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updatarolesboo = false">取 消</el-button>
          <el-button type="primary" @click="updaterolesqu">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除的对话框 -->
      <el-dialog title="提示" :visible.sync="deldialogrole" width="30%">
        <span>确定要删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deldialogrole = false">取 消</el-button>
          <el-button type="primary" @click="deletefun">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        delid: '',
        rolesList: [],
        addrolesboo: false,
        updatarolesboo: false,
        deldialogrole: false,
        addroles: {
          roleName: '',
          roleDesc: ''
        },
        updataroless: {
          roleId: '',
          roleName: '',
          roleDesc: ''
        },
        rules: {
          roleName: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [{
            max: 20,
            message: '长度在 20 个字符之内',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      show() {
        this.$axios.get('http://127.0.0.1:8888/api/private/v1/roles').then(res => {
          console.log(res.data.meta.msg)
          console.log(res.data.data)
          if (res.data.meta.status === 200) {
            this.rolesList = res.data.data
          }
        })
      },
      removeroles(role,authid){
        this.$axios.delete(`http://127.0.0.1:8888/api/private/v1/roles/${role.id}/rights/${authid}`).then(res=>{
          if(res.data.meta.status===200){
            this.$message.success(res.data.meta.msg)
            role.children = res.data.data
          }else{
            this.$message.error(res.data.meta.msg)
          }
          
        })
      },
      deletefun() {
        this.$axios.delete('http://127.0.0.1:8888/api/private/v1/roles/' + this.delid).then(res => {
          this.deldialogrole = false
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          }
        })
        this.show()
      },
      delroleslow(id) {
        this.deldialogrole = true
        this.delid = id
        console.log(this.delid)
      },
      closeaddroles() {
        this.$refs.ruleForm.resetFields()
      },
      updateroleslow(id) {
        this.updatarolesboo = true
        this.$axios.get('http://127.0.0.1:8888/api/private/v1/roles/' + id).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.updataroless = res.data.data
          }
        })
      },
      updaterolesqu() {
        this.$refs.updater.validate(val => {
          if (val) {
            this.updatarolesboo = false
            this.$axios.put('http://127.0.0.1:8888/api/private/v1/roles/' + this.updataroless.roleId, {
              roleName: this.updataroless.roleName,
              roleDesc: this.updataroless.roleDesc
            }).then(res => {
              if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
              } else {
                this.$message.error(res.data.meta.msg)
              }
              this.show()
            })
          }
        })
      },
      addrolesfun() {
        this.$refs.ruleForm.validate(val => {
          if (val) {
            console.log('验证通过')
            this.$axios.post('http://127.0.0.1:8888/api/private/v1/roles', {
              roleName: this.addroles.roleName,
              roleDesc: this.addroles.roleDesc
            }).then(res => {
              this.addrolesboo = false;
              console.log(res.data)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
              } else {
                this.$message.error(res.data.meta.msg)
              }
              this.show();
            })
          }
        })
      }
    },
    created() {
      this.show()
    }
  }
</script>

<style lang='scss' scoped>
  .el-tag{
    margin: 7px;

  }
  .onerow{
    border-bottom: 1px solid #eee;
  }
  .onerow1{
    border-top: 1px solid #eee;
  }
  .tworow{
    border-top: 1px solid #eee;
  }
  .el-row{
    display:flex;
    align-items: center;
  }
</style>
