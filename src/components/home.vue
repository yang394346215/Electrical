<template>
  <div class="home_box">
    <el-container>
      <!-- 顶部区域 -->
      <el-header>
        <div class="home_title">
          <img src="../assets/logo.png">
          <span>后台管理</span>
        </div>
        <el-button type='info' @click="quit">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧菜单栏区域 -->
        <el-aside style="width: auto;">
          <div class='aside_fold' @click="dji">|||</div>
          <el-menu :default-active="index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#333845" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse"
             router >
            <!-- 一级菜单-->
            <!-- :index="n.id+''"因为v-on只接受字符串 -->
            <el-submenu :index="n.id+''" v-for="n in menuList" :key='n.id'>
              <template slot="title">
                <i :class="iconList[n.id]"></i>
                <span>{{n.authName}}</span>
              </template>
              <!-- 一级子菜单 -->
              <el-menu-item :index="'/'+m.path" v-for="m in n.children" :key='m.id' @click='highlight(m.path)'>
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{m.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        menuList: '',
        iconList: {
          '125': 'el-icon-user-solid',
          '103': 'el-icon-warning',
          '101': 'el-icon-s-goods',
          '102': 'el-icon-s-order',
          '145': 'el-icon-s-marketing'
        },
        isCollapse: false,
        index:''
      }
    },
    methods: {
      quit() {
        window.sessionStorage.clear('token')
        this.$router.push('/login')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      show() {
        this.$axios.get('http://127.0.0.1:8888/api/private/v1/menus').then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            console.log(res.data.meta.msg)
            this.menuList = res.data.data
          }
        })
      },
      dji() {
        this.isCollapse = !this.isCollapse
      },
      highlight(path){
        window.sessionStorage.setItem('index','/'+path)
      }
    },
    created() {
      this.show()
      if(window.sessionStorage.getItem('index')){
        this.index=window.sessionStorage.getItem('index')
      }

    }
  }
</script>

<style lang="scss" scoped>
  .home_box {
    height: 100%;
  }

  .el-container {
    height: 100%;

    .el-menu {
      border-right: 0;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  .el-header {
    background-color: #32383B;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0px;

    .home_title {
      height: 60px;
      display: flex;
      align-items: center;
      width: 200px;

      img {
        height: 100%;
        padding: 5px;
        box-sizing: border-box;
        margin-right: 10px;
      }

      span {
        color: #FFFFFF;
        font-size: 20px;
      }
    }
  }

  .el-aside {
    background-color: #333845;

    .aside_fold {
      background-color: #454F61;
      font-size: 12px;
      text-align: center;
      height: 20px;
      color: #FFFFFF;
      line-height: 20px;
      letter-spacing: 3px;
      cursor: pointer;
    }
  }

  .el-main {
    background-color: #E7ECEF;

  }
</style>
