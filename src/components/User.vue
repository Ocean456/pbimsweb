<script>
import store from "../store/index.ts";
import {ElMessage, ElNotification} from "element-plus";
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/identity'
})

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
      active: 'info',
      username: '1234'
    }
  },
  methods: {
    submit() {
      ElNotification({
        title: '保存成功',
        message: '个人信息待审核,请稍后重新加载界面',
        type: 'success'
      })
    },
    check() {
      api.get('/personal', {params: {username: this.username}})
          .then(response => {
            ElMessage({
              type: "success",
              message: response.data
            })
          })
    }
  },
  mounted() {
  }
}
</script>

<template>
  <div class="UserInfo">
    <el-tabs v-model="active" class="tabs">
      <el-tab-pane label="信息登记" name="info">
        <el-card class="card">
          <h3 class="Personal">居民个人信息登记</h3>
          <el-form class="user-form" label-position="right" label-width="100px">
            <el-form-item label="身份证号">
              <el-input v-model="id" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="name" style="width: 90%; "></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="gender" placeholder="男" style="width: 90%; ">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-input v-model="nation" style="width: 90%; "></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                  v-model="birthday"
                  style="width: 90%"
                  type="date"
              />
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="address" style="width: 90%; "></el-input>
            </el-form-item>
          </el-form>
          <div class="buttonBox" style="display: flex">
            <el-button class="exit-button" @click="this.store.dispatch('logout')">退出登录</el-button>
            <div style="flex-grow: 1"></div>
            <el-button class="store-button" @click="submit">保存</el-button>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="证件申请" name="card">
        证件申请
      </el-tab-pane>
      <el-tab-pane label="迁移管理" name="migrate">
        迁移申请
      </el-tab-pane>
      <el-tab-pane label="系统设置" name="setting">
        系统设置
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 40px;
}

.card {
  width: 50vw;
  margin-left: 15%;
  margin-top: 150px;
}

.user-form {
  margin-bottom: 30px;
}

.tabs {
  width: 75vw;
}
</style>
