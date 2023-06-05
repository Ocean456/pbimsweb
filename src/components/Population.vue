<script lang="ts">
export default {
  data() {
    return {}
  },
  methods: {
    loading() {

    }
  },
  mounted() {
  }
}
</script>

<template>
  <el-scrollbar height="88vh">
    <div class="population">
      <h3>人口登记</h3>
      <el-card class="card identity" shadow="hover">
        <template #header>
          <el-text>身份登记</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="身份证号：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select style="width: 100%;">
              <el-option>男</el-option>
              <el-option>女</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card domicile" shadow="hover">
        <template #header>
          <el-text>户籍登记</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="曾用名：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="籍贯：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="教育程度：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况：">
            <el-select style="width: 100%;"></el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card certify" shadow="hover">
        <template #header>
          <el-text>居住登记</el-text>
        </template>
        <el-form :label-position="'left'" label-width="90px">
          <el-form-item label="证明期限">
            <el-date-picker style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-card>
      <el-button class="submit">登记</el-button>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.card {
  margin-bottom: 1vh;
  width: 90%;
}

.submit {
  margin-left: 40%;
}
</style>
