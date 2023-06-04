<script>
import store from "../store/index.ts";
import {ElNotification} from "element-plus";


export default {
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      id: '',
      name: '',
      gender: '',
      nation: '',
      birthday: '',
      address: '',
    }
  },
  methods: {
    submit() {
      ElNotification({
        title: '保存成功',
        message: '个人信息待审核,请稍后重新加载界面',
        type: 'success'
      })
    }
  }
}
</script>

<template>
  <div class="UserInfo">
    <el-card class="card">
      <h3 class="Personal">居民个人信息登记</h3>
      <el-form class="user-form" label-position="right" label-width="100px">
        <el-form-item label="身份证号" label-width="130px">
          <el-input v-model="id" placeholder="请输入您的身份证号码" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="130px">
          <el-input v-model="name" placeholder="请输入您的真实姓名" style="width: 80%; "></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="130px">
          <el-select v-model="gender" placeholder="请选择您的真实性别" style="width: 80%; ">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" label-width="130px">
          <el-input v-model="nation" placeholder="请输入您的真实民族" style="width: 80%; "></el-input>
        </el-form-item>
        <el-form-item label="生日日期" label-width="130px">
          <el-date-picker
              v-model="birthday"
              placeholder="请选择您的生日日期"
              style="width: 80%"
              type="date"
          />
        </el-form-item>
        <el-form-item label="地址" label-width="130px">
          <el-input v-model="address" placeholder="请输入您现在的居住地址" style="width: 80%; "></el-input>
        </el-form-item>
        <el-button class="exit-button" @click="this.store.dispatch('logout')">退出登录</el-button>
        <el-button class="store-button" @click="submit">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 40px;
}

.card {
  width: 60vw;
  margin-left: 10%;
  margin-top: 200px;
}
</style>
