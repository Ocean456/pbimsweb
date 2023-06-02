<script lang="ts">
export default {
  methods: {
    help() {
      window.location.replace("https://qm.qq.com/cgi-bin/qm/qr?k=bZch7LePlI2qiBeEsgDZe5t4UCv0fN9l&noverify=0&personal_qrcode_source=4")
    }
  }
}
</script>

<template>
  <div id="help">
    <h3>帮助支持</h3>
    <el-button @click="help">添加客服QQ</el-button>
  </div>
</template>

<style scoped>

</style>
