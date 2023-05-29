<template>
  <div class="app">
    <el-menu :ellipsis="false" mode="horizontal">
      <el-menu-item>人口基本信息管理系统</el-menu-item>
      <div class="flex-grow"></div>
      <el-sub-menu index="#">
        <template #title>
          <el-icon>
            <User/>
          </el-icon>
          <span>{{ username }}</span>
        </template>
        <el-menu-item index="#">个人资料</el-menu-item>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-container class="content">
      <el-menu class="sidebar" :default-active="$route.path" router>
        <el-menu-item index="/">
          <el-icon>
            <House/>
          </el-icon>
          <span>系统首页</span>
        </el-menu-item>
        <el-menu-item index="/manage">
          <el-icon>
            <UserFilled/>
          </el-icon>
          <span>身份信息</span>
        </el-menu-item>
        <el-menu-item index="/analysis">
          <el-icon>
            <TrendCharts/>
          </el-icon>
          <span>人口分析</span>
        </el-menu-item>
        <el-menu-item index="/export">
          <el-icon>
            <Download/>
          </el-icon>
          <span>信息导出</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon>
            <Setting/>
          </el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
      <router-view class="view"/>
    </el-container>

  </div>
</template>

<script lang="ts">

import {Download, House, Setting, TrendCharts, User, UserFilled} from "@element-plus/icons-vue";
import {mapGetters} from "vuex";
import router from "./router";
import store from "./store";
import {ElMessage} from "element-plus";

export default {
  components: {TrendCharts, UserFilled, House, User, Download, Setting},
  computed: {
    ...mapGetters(["currentUser"]),
    username() {
      return this.currentUser ? this.currentUser.username : "";
    }
  }, methods: {
    logout() {
      store.dispatch('logout')
          .then(() => {
            router.push('/');
            ElMessage({
              message: '退出成功',
              type: 'success'
            })
          })
    }
  }
}
</script>

<style>
.sidebar{
  height: 90vh;
}
.flex-grow {
  flex-grow: 1;
}

.view {
  margin-left: 10%;
}
</style>
