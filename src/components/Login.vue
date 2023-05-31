<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1 class="login-title">登录</h1>
      <el-form class="login-form" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" @keyup.enter="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import router from "../router/index.ts";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        this.$store.dispatch('login', {username: this.username, password: this.password})
            .then(() => {
              router.push('/manage');
            })
            .catch(error => {
              console.error(error);
              ElMessage.warning("账号或密码错误");
            });
      } else {
        ElMessage.warning("请输入用户名和密码");
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 65vw;
}

.login-card {
  width: 400px;
  padding: 24px;

}

.login-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 24px;
}

.login-form {
  width: 100%;
}

.login-button {
  width: 100%;
}
</style>
