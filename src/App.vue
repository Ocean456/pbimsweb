<template>
  <div class="app">
    <el-menu :ellipsis="false" mode="horizontal">
      <el-menu-item id="logo">人口基本信息管理系统</el-menu-item>
      <div class="flex-grow"></div>
      <el-sub-menu index="#">
        <template #title>
          <el-icon>
            <User/>
          </el-icon>
          <el-text>{{ username }}</el-text>
        </template>
        <el-menu-item v-if="isLoggedIn" @click="router().push('/user')">个人资料</el-menu-item>
        <el-menu-item v-if="isLoggedIn" @click="logout">退出登录</el-menu-item>
        <el-menu-item v-if="!isLoggedIn" @click="router().push('/login')">登录系统</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-container class="content">
      <el-menu id="side" :default-active="$route.path" class="sidebar" router>
        <el-menu-item index="/">
          <el-icon>
            <House/>
          </el-icon>
          <el-text>系统首页</el-text>
        </el-menu-item>
        <el-menu-item index="/manage">
          <el-icon>
            <UserFilled/>
          </el-icon>
          <el-text>身份信息</el-text>
        </el-menu-item>
        <el-menu-item index="/analysis">
          <el-icon>
            <TrendCharts/>
          </el-icon>
          <el-text>人口统计</el-text>
        </el-menu-item>
        <el-menu-item index="/export">
          <el-icon>
            <Download/>
          </el-icon>
          <el-text>信息导出</el-text>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon>
            <Setting/>
          </el-icon>
          <el-text>系统设置</el-text>
        </el-menu-item>
        <el-menu-item index="/help">
          <el-icon>
            <MoreFilled></MoreFilled>
          </el-icon>
          <el-text>帮助支持</el-text>
        </el-menu-item>
      </el-menu>

      <router-view class="view"/>
    </el-container>

  </div>
</template>

<script lang="ts">

import {Download, House, MoreFilled, Rank, Setting, TrendCharts, User, UserFilled} from "@element-plus/icons-vue";
import {mapGetters} from "vuex";
import router from "./router";
import store from "./store";
import {ElMessage} from "element-plus";

// noinspection JSUnusedGlobalSymbols
export default {
  components: {MoreFilled, Rank, TrendCharts, UserFilled, House, User, Download, Setting},
  computed: {
    ...mapGetters(["currentUser", "isLoggedIn"]),
    username() {
      return this.currentUser ? this.currentUser.username : "";
    }
  },
  data() {
    return {
      login: store.state.loggedIn
    }
  },

  methods: {
    router() {
      return router
    },
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
#logo {
  user-select: none;
  pointer-events: none;
}

.sidebar {
  height: 90vh;
}

.flex-grow {
  flex-grow: 1;
}

.view {
  margin-left: 10%;
}


</style>
