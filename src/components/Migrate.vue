<script>
import axios from "axios";

const info = axios.create({
  baseURL: 'http://localhost:8080/api/migrate'
})

export default {
  data() {
    return {
      totalData: [{
        id: '',
        address: '',
        reason: '',
        status: ''
      }]
    }
  },
  methods: {
    async loadData() {
      await info.get('/search')
          .then(response => {
            this.totalData = response.data
          })
    },
    async confirm(row) {
      await info.put('/renew', {
        id: row.id,
        address: row.address,
        reason: row.reason
      })
      await this.loadData()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="migrate">
    <h3>迁移信息管理</h3>
    <el-table :data="totalData" border style="width: 100%; max-width: 925px">
      <el-table-column label="身份证号" prop="id" width="180"></el-table-column>
      <el-table-column label="迁往地址" prop="address" width="220"></el-table-column>
      <el-table-column label="迁移原因" prop="reason" width="220"></el-table-column>
      <el-table-column label="迁移时间" prop="date" width="150"></el-table-column>
      <el-table-column align="center" label="操作" prop="status" width="155">
        <template #default="scope">
          <el-button
              v-if="scope.row.status===1"
              size="small" type="primary"
              @click="confirm(scope.row)">审批
          </el-button>
          <el-button
              v-if="scope.row.status===2"
              disabled
              size="small"
              type="primary">已审批
          </el-button>
          <el-button size="small" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
