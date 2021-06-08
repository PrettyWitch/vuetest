<!--3.获取有关办公室中所有计算机的信息。[G]GET /办公室/ {officeUid} /汽车-->
<!--4.获取有关汽车及其在特定办公室中的可用性的信息。[G]GET /办公室/ {officeUid} /汽车/ {carUid}-->
<!--5.获取有关汽车及其在所有办公室的可用性的信息。[G]GET /办公室/汽车/ {carUid}-->
<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%" height="500px">
<!--      <el-table-column-->
<!--          fixed-->
<!--          prop="id"-->
<!--          label="id"-->
<!--          width="100"-->
<!--      >-->
<!--      </el-table-column>-->

      <el-table-column
          prop="office.officeUid"
          label="officeUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="office.location"
          label="location"
          style="width: 20%"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.registrationNumber"
          label="registrationNumber"
          width="200"
      >
      </el-table-column>


      <el-table-column
          prop="availabilitySchedules"
          label="availabilitySchedules"
          width="250"
      >
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="booking(scope.row)" type="text" size="small">booking</el-button>
<!--          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  methods: {
//方法要重写
    booking(row) {
      this.$router.push({
        path: '/carUpdate',
        query: {
          id: row.id
        }
      })
      console.log(row);
    },
  },

  created() {
    const _this = this
    axios.get('http://localhost:8182/office/cars/' + this.$route.query.carUid).then(function (resp) {
      _this.tableData = resp.data
      console.log(resp)
    })
  },
  data() {
    return {
      // total:null,
      tableData: [{
        // id: '',
        office:{
          officeUid:'',
          location:''
        },
        availableCars: {
          registrationNumber: ''
        },
        availabilitySchedules: ''
      }]
    }
  }
}
</script>