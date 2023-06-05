<script lang="ts" setup>

</script>

<template>
  <div class="search">
    <h3>信息查询</h3>
    <el-form>
      <el-form-item label="身份证号：">
        <el-input style="max-width: 600px">
          <template #append>
            <el-button>查询</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-card class="info" shadow="none">
      <el-skeleton :rows="10"></el-skeleton>
    </el-card>
  </div>
</template>

<style scoped>
.info{
  margin-top: 30px;
  max-width: 682px;
}
</style>
