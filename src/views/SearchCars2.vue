<!--3.获取有关办公室中所有计算机的信息。[G]GET /办公室/ {officeUid} /汽车-->
<!--4.获取有关汽车及其在特定办公室中的可用性的信息。[G]GET /办公室/ {officeUid} /汽车/ {carUid}-->
<!--5.获取有关汽车及其在所有办公室的可用性的信息。[G]GET /办公室/汽车/ {carUid}-->
<template>

  <div>
    <h4>Car info:</h4>
    <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        style="width: 100%">

<!--      border-->
      <!--      <el-table-column-->
      <!--          fixed-->
      <!--          prop="id"-->
      <!--          label="id"-->
      <!--          width="100"-->
      <!--      >-->
      <!--      </el-table-column>-->

      <el-table-column
        prop="availableCars.car.carUid"
        label="carUid"
        width="180"
    >
    </el-table-column>

<!--      style="width: 5%"-->
      <el-table-column
          prop="availableCars.car.brand"
          label="brand"
          style="width: 10%"

      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.model"
          label="model"
          width="180"
      >
      </el-table-column>


      <el-table-column
          prop="availableCars.car.power"
          label="power"
          width="180"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.type"
          label="type"
          width="180"
      >
      </el-table-column>

      <!--      <el-table-column-->
      <!--          fixed="right"-->
      <!--          label="操作"-->
      <!--          width="150">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button @click="booking(scope.row)" type="text" size="small">booking</el-button>-->
      <!--          &lt;!&ndash;          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->

    </el-table>

    <h4>Offices info for this car:</h4>
    <el-table
        :data="tableData"

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
          width="220"
      >
      </el-table-column>


      <el-table-column
          prop="availableCars.availabilitySchedules"
          label="availabilitySchedules"
          width="280"
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
    arraySpanMethod(){
      return{
        rowspan: this.tableData.length,
        colspan: 1,
      }
    }
  },

  created() {
    const _this = this
    axios.get('http://localhost:8182/offices/cars/' + this.$route.query.carUid).then(function (resp) {
      _this.tableData = resp.data
      console.log(resp)
    })
  },
  data() {
    return {
      // total:null,
      tableData: [{
        // id: '',
        office: {
          officeUid: '',
          location: ''
        },
        availableCars: {
          car: {
            carUid: '',
            brand: '',
            model: '',
            power: '',
            type: ''
          },
          registrationNumber: '',
          availabilitySchedules: ''
        },

      }]
    }
  }
}
</script>