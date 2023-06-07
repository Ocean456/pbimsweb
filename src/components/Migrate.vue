<script >
import axios from "axios";
const info=axios.create({
  baseURL:'http://localhost:8080/api/migrate'
})

export default {
  data(){
    return{
      totalData:[{
        id:'',
        address:'',
        reason:'',
        status:''
      }]
    }
  },
  methods:{
    async loadData(){
      await info.get('/search')
          .then(response=>{
            this.totalData=response.data
          })
    },
    async examine(row){
      await info.put('/renew',{
        id:row.id,
        address:row.address,
        reason:row.reason
      })
      this.loadData()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<template>
  <div class="migrate"><h3>
    <h3 >迁移信息管理</h3>
    <el-table :data="totalData" style="width: 70%;" border>
      <el-table-column label="身份证号" prop="id" width="220"></el-table-column>
      <el-table-column label="迁移新址" prop="address" width="220"></el-table-column>
      <el-table-column label="迁移原因" prop="reason" width="220"></el-table-column>
      <el-table-column label="操作" prop="status" width="155">
        <template #default="scope">
          <el-button v-if="scope.row.status===1" type="primary" size="small" class="check" @click="examine(scope.row)" >审批</el-button>
          <el-button v-if="scope.row.status===2" type="primary" size="small" class="check1" disabled>已审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  </h3></div>
</template>

<style scoped>
.check{
  margin-left: 40%;
  background: orangered;
}
.check1{
  margin-left: 31%;
  background: green;
}
</style>
