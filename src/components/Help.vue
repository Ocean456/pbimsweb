<script lang="ts">
export default {
  methods: {
    help() {
      window.location.replace("tencent://message/?uin=1624133013&Site=&Menu=yes")
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
