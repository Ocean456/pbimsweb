<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1 class="login-title">居民登录</h1>
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
        <el-form-item>
          <el-button class="register-button" type="info" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  }
}
</script>


<style scoped>
* {
  user-select: none;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 65vw;
  margin: auto;
}

.login-card {
  width: 400px;
  padding: 24px;
  backdrop-filter: blur(px);
  background-color: rgba(255, 255, 255, 0.5);
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
  margin-top: 10px;
  width: 100%;
}

.register-button {
  width: 100%;
}


</style>
<style>
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

}

</style>
