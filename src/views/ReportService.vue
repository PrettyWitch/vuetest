<!--3.获取有关办公室中所有计算机的信息。[G]GET /办公室/ {officeUid} /汽车-->
<!--4.获取有关汽车及其在特定办公室中的可用性的信息。[G]GET /办公室/ {officeUid} /汽车/ {carUid}-->
<!--5.获取有关汽车及其在所有办公室的可用性的信息。[G]GET /办公室/汽车/ {carUid}-->
<template>
  <div>
    <h4>Report Service</h4>
    <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="officeUid" value="1"></el-option>
        <el-option label="car model" value="2"></el-option>
      </el-select>
      <el-button @click.native="view()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div>
    <h4>Booking info</h4>
    <el-table
        :data="tableData"
        style="width: 100%" height="500px">

      <el-table-column
          prop="bookingUid"
          label="bookingUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="car.carUid"
          label="carUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="userUid"
          label="userUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="paymentUid"
          label="paymentUid"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="bookingPeriod"
          label="bookingPeriod"
          style="width: 20%"
      >
      </el-table-column>

      <el-table-column
          prop="bookingStatus"
          label="bookingStatus"
          width="150"
      >
      </el-table-column>

      <el-table-column
          prop="takeFromOffice"
          label="takeFromOffice"
          width="150"
      >
      </el-table-column>

      <el-table-column
          prop="returnToOffice"
          label="returnToOffice"
          width="150"
      >
      </el-table-column>
      <!--      <el-table-column-->
      <!--          fixed="right"-->
      <!--          label="操作"-->
      <!--          width="150">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button @click="view(scope.row)" type="text" size="small">view</el-button>-->
      <!--          <el-button @click="booking(scope.row)" type="text" size="small">booking</el-button>-->
      <!--          <el-button @click="del(scope.row)" type="text" size="small">delete</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

    </el-table>
  </div>
</template>


<script>
export default {
  methods: {
    view: function () {
      console.log(this.input3)
      console.log(this.select)
      //14.按办公室查看预订统计信息。[A] [G]
      //GET /reports/booking-by-offices
      if (this.select === '1') {
        let officeUid = this.input3
        const _this = this
        axios.get('http://localhost:8186/reports/booking-by-offices', {params: {'officeUid': officeUid}}).then(function (resp) {
          _this.tableData = resp.data
          console.log(resp)
        })
      } else if (this.select === '2') {
        // 4.获取有关汽车及其在特定办公室中的可用性的信息。[G]
        // GET / offices / {officeUid} / cars / {carUid}
        let model = this.input3
        const _this = this
        axios.get('http://localhost:8186/reports/booking-by-models/', {params: {'model': model}}).then(function (resp) {
          _this.tableData = resp.data
          console.log(resp)
        })
      }
    },
    // arraySpanMethod: function (row){
    //   if (row > 1){
    //     return 'hidden-row';
    //   }
    // }
    // /12.从办公室删除车辆。[A] [M] [G] DELETE /offices/{officeUid}/car/{carUid}
    del(row) {
      const _this = this
      axios.delete('http://localhost:8182/offices/' + this.$route.query.officeUid + '/car/' + row.availableCars.car.carUid).then(function (resp) {
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

  // created() {
  //
  //   if (this.select === 1) {
  //     //14.按办公室查看预订统计信息。[A] [G]
  //     //GET /reports/booking-by-offices
  //     const _this = this
  //     axios.get('http://localhost:8186/reports/booking-by-offices' + this.tableData.input3).then(function (resp) {
  //       _this.tableData = resp.data
  //       console.log(resp)
  //     })
  //   } else if(this.select === 2) {
  //     // 4.获取有关汽车及其在特定办公室中的可用性的信息。[G]
  //     // GET / offices / {officeUid} / cars / {carUid}
  //     const _this = this
  //     axios.get('http://localhost:8186/reports/booking-by-models' + this.tableData.input3).then(function (resp) {
  //       _this.tableData = resp.data
  //       console.log(resp)
  //     })
  //   }
  // },

  data() {
    return {
      input3: '',
      select: '',
      // total:null,
      tableData: [{
        bookingUid: '',
        car: {
          carUid: ''
        },
        userUid: '',
        paymentUid: '',
        bookingPeriod: '',
        bookingStatus: '',
        takeFromOffice: '',
        returnToOffice: ''
      }]
    }
  }
}
</script>
<style>
.el-select .el-input {
  width: 200px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

