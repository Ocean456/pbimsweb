<script>
import store from "../store/index.ts";
import {ElMessage, ElNotification} from "element-plus";
import axios from 'axios'
import {mapGetters} from "vuex";

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export default {
  computed: {
    store() {
      return store
    },
    ...mapGetters(["currentUser", "isLoggedIn", "MenuUI"]),
    username() {
      return this.currentUser ? this.currentUser.username : "";
    }
  },
  data() {
    return {
      info: {
        id: '',
        name: '',
        gender: '',
        nation: '',
        birthday: '',
        address: '',
      },
      migrate: {
        id: '',
        address: '',
        date: new Date(),
        reason: ''
      },
      active: 'info'
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
      api.get('/identity/personal', {params: {username: this.username}})
          .then(response => {
            ElMessage({
              type: "success",
              message: response.data
            })
          })
    },
    submitMigrate() {

    }
  },
  mounted() {
    this.check();
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
              <el-input v-model="info.id" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="info.name" style="width: 90%; "></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="info.gender" placeholder="男" style="width: 90%; ">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-input v-model="info.nation" style="width: 90%; "></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                  v-model="info.birthday"
                  style="width: 90%"
                  type="date"
              />
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="info.address" style="width: 90%; "></el-input>
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
        <el-card class="card">
          <h3 style="margin-left: 40%">迁移信息管理</h3>
          <el-form class="migrate-form" label-position="top" label-width="100px">
            <el-form-item label="身份证号" label-width="130px">
              <el-input v-model="migrate.id" disabled style="width: 90%;height: 40px"></el-input>
            </el-form-item>
            <el-form-item label="新的迁移地点" label-width="130px">
              <el-input v-model="migrate.address" placeholder="请输入您要迁移的地点"
                        style="width: 90%;height: 40px"></el-input>
            </el-form-item>
            <el-form-item label="迁移时间" label-width="130px">
              <el-date-picker
                  v-model="migrate.date"
                  placeholder="请选择您的迁移日期"
                  style="width: 90%;height: 40px"
                  type="date"
              />
            </el-form-item>
            <el-form-item label="迁移原因" label-width="130px">
              <el-input v-model="migrate.reason" style="width: 90%" type="textarea"></el-input>
            </el-form-item>
            <el-button @click="submitMigrate">提交</el-button>
          </el-form>
        </el-card>
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
