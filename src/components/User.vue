<script>
import axios from "axios";
import {ref} from "vue";
import {ElMessage} from "element-plus";
const info=axios.create({
  baseURL:'http://localhost:8080'
})
export default {
  data(){
    return{
      id:'',
      name:'',
      gender:'',
      nation:'',
      birthday:'',
      address:'',
    }
  },
  methods:{
    login(){
    }
  }
}
</script>

<template>
  <div class="UserInfo">
    <h1 class="Personal">居民个人信息登记</h1>
    <el-form class="user-form" label-position="right" label-width="100px">
      <el-form-item label="身份证号码:"  >
        <el-input v-model="id" placeholder="请输入您的身份证号码" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="name" placeholder="请输入您的真实姓名" style="width: 80%; " ></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="gender" placeholder="请选择您的真实性别" style="width: 80%; " >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="民族:">
        <el-input v-model="nation" placeholder="请输入您的真实民族" style="width: 80%; " ></el-input>
      </el-form-item>
      <el-form-item label="生日日期:">
        <el-date-picker
            v-model="birthday"
            type="date"
            placeholder="请选择您的生日日期"
            style="width: 80%"
        />
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="address" placeholder="请输入您现在的居住地址" style="width: 80%; " ></el-input>
      </el-form-item>
      <el-button class="store-button" @click="login">保存</el-button>
    </el-form>
  </div>
</template>

<style scoped>
.Personal{
  font-size: 24px;
  margin-left: 400px;
}
.UserInfo{
  align-items: center;
}
.user-form{
  margin-left: 10%;
}
</style>
