<template>
  <el-menu mode="horizontal" :ellipsis="false">
    <el-menu-item>人口基本信息管理系统</el-menu-item>
    <div class="flex-grow"></div>
    <el-sub-menu index="#">
      <template #title>
        <el-icon>
          <User/>
        </el-icon>
        <span>Admin</span>
      </template>
      <el-menu-item index="#">个人资料</el-menu-item>
      <el-menu-item index="#">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-container>
    <el-menu :default-active="$route.path" router>
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

</template>

<script lang="ts" setup>

import {Download, House, Setting, TrendCharts, User, UserFilled} from "@element-plus/icons-vue";
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.view{
  margin-left: 10%;
}
</style>
