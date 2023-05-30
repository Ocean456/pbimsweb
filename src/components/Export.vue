<template>
  <div v-loading="loading" class="export">
    <h3>导出</h3>
    <el-button @click="exportData">导出</el-button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Papa from 'papaparse';
import {ElMessage} from "element-plus";

const api = axios.create({
  baseURL: 'http://localhost:3000'
})
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async exportData() {
      this.loading = true
      await api.get('/api/search')
          .then(response => {
            const data = response.data;
            const csv = Papa.unparse(data);
            const blob = new Blob([csv], {type: 'text/csv;charset=ANSI;'});
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'export.csv';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.loading = false
          }).catch(error => {
            ElMessage.error(error)
          })
    }
  }
}
</script>

<style scoped>

</style>
