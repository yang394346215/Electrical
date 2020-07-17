<template>
  <div class="login_box">
    <div class="imp_box">
      <div class="head_box">
        <img src="../assets/head.png" alt="">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormref" label-width="0px" class="login_form">
        <!-- prop里的名字,要和ruleForm里和rules里的一致 -->
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item prop="userpwd">
          <el-input v-model="ruleForm.userpwd" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item class="btn">
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
      </el-form>


    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        msg:'',
        ruleForm: {
          username: '',
          userpwd:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          userpwd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{

      //提交登录数据
      onSubmit(){
        //elementUI-form提供的表单校验通过
        this.$refs.ruleFormref.validate(vali=>{
          //通过vali则返回true
          if(vali){
            this.$axios.post('http://127.0.0.1:8888/api/private/v1/login',{
              username:this.ruleForm.username,
              password:this.ruleForm.userpwd
            }).then(res=>{
              console.log(res.data)
              if(res.data.meta.status === 200){
                this.$message.success('登录成功')
                //用sessionStorage来保存用户登录返回的传过来的token
                window.sessionStorage.setItem('token',res.data.data.token)
                this.$router.push('/home')
              }else{
                this.$message.error('登录失败')

              }
            })
          }
        })


      },
      //重置表单
      reset(){
        this.$refs.ruleFormref.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login_box{

    height: 100%;
    background-color: #aaaaaa;
    .imp_box{
      background-color: #ffffff;
      width: 500px;
      height: 350px;
      border-radius: 10px;
      box-shadow: 0 0 6px #767676;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 25%;
      .head_box{
        border: 1px solid #c1c1c1;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        padding: 10px;
        overflow: hidden;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #FFFFFF;
        img{
          width: 100%;
          height: 100%;
          background-color: #bcbcbc;
          border-radius: 50%;
        }
      }
    }
  }
  .login_form{
    position: absolute;
    bottom:0;
    width:100%;
    padding:10px 30px;
    box-sizing: border-box;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
  }
</style>
