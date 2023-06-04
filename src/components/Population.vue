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
  <div class="population">
    <h3>人口登记</h3>
    <el-card class="card identity" shadow="hover">
      <template #header>
        <el-text>身份登记</el-text>
      </template>
      <el-form>
        <el-form-item label="身份证号"></el-form-item>
      </el-form>
    </el-card>
    <el-card class="card domicile" shadow="hover">
      <template #header>
        <el-text>户籍登记</el-text>
      </template>
    </el-card>
    <el-card class="card certify" shadow="hover">
      <template #header>
        <el-text>居住登记</el-text>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 1vh;
  width: 90%;
}

</style>
