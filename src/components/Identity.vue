<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";


const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})
const spring = axios.create({
  baseURL: 'http://localhost:8080/api'
})
export default defineComponent({
  data() {
    return {
      keyword: '',
      select: ref(''),
      totalData: [],
      pageData: [],
      add: {
        id: '',
        name: '',
        gender: '',
        address: '',
        nationality: ''
      },
      editRow: {
        card_id: '',
        name: '',
        gender: '',
        address: '',
        nationality: ''
      },
      pageSize: 16,
      currentPage: 1,
      total: 0,
      dialog: false,
      edit: false
    }
  },
  methods: {
    async searchData() {
      // await spring.get(`search/${this.keyword}`)
      await api.get(`search/${this.keyword}`)
          .then(response => {
            this.totalData = response.data;
          })
      this.getPageData()
    },
    deleteData(id) {
      api.delete(`/delete/${id}`)
          .then(response => {
            ElMessage({
              message: response.data.message,
              type: 'success'
            })
            this.searchData();
          })
          .catch(error => {
            ElMessage({
              message: error,
              type: 'warning'
            })
          })
      this.handleCurrentChange(this.currentPage)
    },
    addData() {
      api.post('/add', this.add)
          .then(response => {
            ElMessage({
              message: response.data.message,
              type: 'success'
            })
          })
          .catch(error => {
            ElMessage({
              message: error,
              type: 'warning'
            })
          })
      this.searchData();
      this.dialog = false
      this.handleCurrentChange(this.currentPage)
    },
    async editData() {
      await api.put('/edit', this.editRow)
          .then(response => {
            ElMessage({
              message: response.data.message,
              type: 'success'
            })
          })
          .catch(error => {
            ElMessage({
              message: error,
              type: 'warning'
            })
          })
      await this.searchData();
      this.edit = false
      this.handleCurrentChange(this.currentPage)
    },
    getPageData() {
      this.total = this.totalData.length
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      this.pageData = this.totalData.slice(startIndex, endIndex);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPageData()
    },
    editDialog(row) {
      const index = this.totalData.findIndex((item) => item.address === row.address)
      this.editRow = {...this.totalData[index]}
      this.edit = true
    }
  },
  mounted() {
    this.searchData()
  }
})

</script>

<template>
  <div class="identity">
    <h3>身份信息管理</h3>
    <el-input v-model="keyword" placeholder="输入" style="width: 870px;" @keyup.enter="searchData">
      <template #prepend>
        <el-select v-model="select" placeholder="身份证号" style="width: 115px">
          <el-option label="身份证号" value="1"></el-option>
          <el-option disabled label="姓名" value="2"></el-option>
          <el-option disabled label="地址" value="3"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button style="width: 80px" @click="searchData">查询</el-button>
      </template>
    </el-input>
    <el-table
        :data="pageData"
        :default-sort="{prop:'card_id',order:'descending'}"
        border height="720"
        stripe

        style="width: 870px;">
      <el-table-column
          label="身份证号"
          prop="card_id" sortable width="180"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="gender" width="60"></el-table-column>
      <el-table-column label="地址" prop="address" width="280"></el-table-column>
      <el-table-column label="民族" prop="nationality" width="100"></el-table-column>
      <el-table-column align="right" width="150">
        <template #header>
          <el-button text @click="dialog=true">添加</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" type="primary" @click="editDialog(scope.row)">编辑</el-button>
          <!--suppress TypeScriptUnresolvedReference -->
          <el-button size="small" type="danger" @click="deleteData(scope.row.card_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage" :page-size="pageSize"
        :total="total"
        class="p"
        layout="total,prev,pager,next,jumper"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>

  <el-dialog v-model="dialog" title="添加" width="40%">
    <el-input v-model="add.id">
      <template #prepend>身份证号</template>
    </el-input>
    <el-input v-model="add.name" class="input">
      <template #prepend>姓名</template>
    </el-input>
    <el-input v-model="add.gender" class="input">
      <template #prepend>性别</template>
    </el-input>
    <el-input v-model="add.address" class="input">
      <template #prepend>地址</template>
    </el-input>
    <el-input v-model="add.nationality" class="input">
      <template #prepend>民族</template>
    </el-input>
    <template #footer>
      <el-button class="button" @click="dialog = false">取消</el-button>
      <el-button class="button" type="primary" @click="addData">添加</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="edit" width="40%">
    <el-form :model="editRow" label-width="80px">
      <el-form-item label="身份证号">
        <el-input v-model="editRow.card_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editRow.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="editRow.gender"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editRow.address"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="editRow.nationality"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="edit=false">取消</el-button>
      <el-button type="primary" @click="editData">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.identity {
  margin-left: 10%;
}

.input {
  margin-top: 15px;
}

.button {
  margin-top: 10px;
}

.p {
  margin-top: 30px;
  margin-left: 20%;
}

</style>
