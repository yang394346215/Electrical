<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/commain' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="rightsList" style="width: 100%" :border=true>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="250">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="250">
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '2'">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '111',
        rightsList: []
      }
    },
    methods: {
      show() {
        this.$axios.get('http://127.0.0.1:8888/api/private/v1/rights/list').then((res) => {
          if (res.data.meta.status === 200) {
            console.log(res.data.meta.msg)
            console.log(res.data.data)
            this.rightsList = res.data.data
          }
        })
      }
    },
    created() {
      this.show()
    }
  }
</script>

<style>
</style>
