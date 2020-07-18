<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- el-row 用element-ui的Layout布局 gutter间隔 span宽度-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="show"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :span="3" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 主体表单 -->
      <el-table :data="tableData" style="width: 100%;margin-top: 15px;" border>
        <el-table-column prop="id" label="#" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="180">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
          <!-- 向状态这栏绑定作用域插槽scope.row可以获取这一列所有传过来的数据tableData -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="monitorswitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- el-tooltip给按钮配置文字， enterable鼠标能否进入文字区域-->
            <el-tooltip class="item" effect="dark" content="修改用户" placement="top" :enterable="false">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
            </el-tooltip>


          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagenum"
        :page-sizes="[1,2,3,4,5]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total"
        style="margin-top: 15px;">
      </el-pagination>
    </el-card>


    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close='areset'>


      <el-form :model="adduser" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adduser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="adduser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addusers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      //制定邮箱的规则
      var ruleemail = (rule, value, callback) =>{
        const aemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(aemail.test(value)){
          callback()
        }else{
          callback(new Error('请输入合法的邮箱'))
        }

      }
      //制定手机的规则
      var ruleephone = (rule, value, callback) =>{
        const aphone = /^1[3456789]\d{9}$/
        if(aphone.test(value)){
          callback()
        }else{
          callback(new Error('请输入合法的手机号'))
        }
      }
      return {
        tableData: [],
        query: '',
        pagenum: 1,
        pagesize: 1,
        total: 0,
        //控制添加用户对话框开关
        dialogVisible: false,
        adduser:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        rules:{
          username:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          email:[
             { validator: ruleemail, trigger: 'blur' }
          ],
          mobile:[
             { validator: ruleephone, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      show() {
        this.$axios.get(
          `http://127.0.0.1:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        ).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            console.log(res.data.meta.msg)
            this.tableData = res.data.data.users
            this.total = res.data.data.total
            this.pagenum = res.data.data.pagenum
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.$axios.get(
          `http://127.0.0.1:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        ).then(res => {
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data.users
          }
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.$axios.get(
          `http://127.0.0.1:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        ).then(res => {
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data.users
          }
        })
      },
      monitorswitch(row) {
        this.$axios.put(`http://127.0.0.1:8888/api/private/v1/users/${row.id}/state/${row.mg_state}`).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: 'success'
            });
          } else {
            this.$message.error(res.data.meta.msg);
          }
        })
      },
      areset(){
        this.$refs.ruleForm.resetFields()
      },
      addusers(){
        this.$refs.ruleForm.validate(vail=>{
          if(vail){
            this.$axios.post('http://127.0.0.1:8888/api/private/v1/users',this.adduser).then(res=>{
              console.log(res.data)
              if(res.data.meta.status===201){
                this.$message.success(res.data.meta.msg)
                this.show()
                this.dialogVisible=false
              }else{
                this.$message.error(res.data.meta.msg)
              }
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

<style lang="scss" scoped>

</style>
