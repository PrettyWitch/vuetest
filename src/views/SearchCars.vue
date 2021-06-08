<!--3.获取有关办公室中所有计算机的信息。[G]GET /办公室/ {officeUid} /汽车-->
<!--4.获取有关汽车及其在特定办公室中的可用性的信息。[G]GET /办公室/ {officeUid} /汽车/ {carUid}-->
<!--5.获取有关汽车及其在所有办公室的可用性的信息。[G]GET /办公室/汽车/ {carUid}-->
<template>
  <div>
    <h4>Office info:</h4>
    <!--  :span-method="arraySpanMethod"  -->
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="office.officeUid"
          label="officeUid"
          style="width: 20%"
      >
      </el-table-column>

      <el-table-column
          prop="office.location"
          label="location"
          style="width: 20%"

      >
      </el-table-column>

    </el-table>

    <h4>Cars info for this office:</h4>
    <el-table
        :data="tableData"
        style="width: 100%" height="500px">

      <el-table-column
          prop="availableCars.car.carUid"
          label="carUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.brand"
          label="brand"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.model"
          label="model"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.power"
          label="power"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.car.type"
          label="type"
          width="150"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.registrationNumber"
          label="registrationNumber"
          width="200"
      >
      </el-table-column>

      <el-table-column
          prop="availableCars.availabilitySchedules"
          label="availabilitySchedules"
          style="width: 20%"
      >
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text" size="small">view</el-button>
          <el-button @click="booking(scope.row)" type="text" size="small">booking</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">delete</el-button>
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

    view(row) {
      const officeUid2 = this.$route.query.officeUid
      console.log("carUid:", row.availableCars.car.carUid)
      this.$router.push({
        path: '/user/office/cars',
        query: {
          carUid: row.availableCars.car.carUid,
          officeUid: officeUid2
        }
      })
      console.log("row:", row);
      location.reload()
    },
    // arraySpanMethod: function (row){
    //   if (row > 1){
    //     return 'hidden-row';
    //   }
    // }
    // /12.从办公室删除车辆。[A] [M] [G] DELETE /offices/{officeUid}/car/{carUid}
    del(row) {
      const _this = this
      axios.delete('http://localhost:8182/offices/' +this.$route.query.officeUid + '/car/' + row.availableCars.car.carUid).then(function (resp) {
        console.log(resp)
        if (resp.status === 204) {
          _this.$alert('success', 'Delete Car', {
            confirmButtonText: 'ok',
            callback: action => {
              window.location.reload()
            }
          });
        }
      })
    }
  },

  created() {
    if (typeof this.$route.query.carUid == "undefined") {
      //3.获取有关办公室中所有计算机的信息。[G]
      //GET / offices / {officeUid} / cars
      const _this = this
      axios.get('http://localhost:8182/offices/' + this.$route.query.officeUid + '/cars').then(function (resp) {
        _this.tableData = resp.data
        console.log(resp)
      })
    } else {
      // 4.获取有关汽车及其在特定办公室中的可用性的信息。[G]
      // GET / offices / {officeUid} / cars / {carUid}
      const _this = this
      axios.get('http://localhost:8182/offices/' + this.$route.query.officeUid + '/cars/' + this.$route.query.carUid).then(function (resp) {
        _this.tableData = resp.data
        console.log(resp)
      })
    }
  },
  data() {
    return {
      // total:null,
      tableData: [{
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


