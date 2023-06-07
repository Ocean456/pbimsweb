<script>
import axios from "axios";


const info=axios.create({
  baseURL:'http://localhost:8080/api/certificate'
})

export default {
  data(){
    return{
      totalData:[{
        id:'',
        period:'',
        material:'',
        status:'',

      }],
      s1:2
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
      await info.post('/update',{
        id:row.id,
        period:row.period,
        material:row.material
      })
      this.loadData()
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<template>
  <div class="Certify">
    <h3 >居住证明管理</h3>
    <el-table :data="totalData" style="width: 76%;" border>
      <el-table-column label="身份证号" prop="id" width="255"></el-table-column>
      <el-table-column label="申请到期时间" prop="period" width="180"></el-table-column>
      <el-table-column label="申请材料" prop="material" width="180"></el-table-column>
      <el-table-column label="操作" prop="status" width="151">
        <template #default="scope">
          <el-button v-if="scope.row.status===1" type="primary" size="small" class="check" @click="examine(scope.row)" >审批</el-button>
          <el-button v-if="scope.row.status===2" type="primary" size="small" class="check1" disabled>已审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.Certify{
  margin-right: 12%;
}
.check{
  margin-left: 38%;
  background: orangered;
}
.check1{
  margin-left:38%;
  background: green;
}
</style>
