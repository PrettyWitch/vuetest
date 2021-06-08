<template>
  <el-table
      :data="tableData"
      style="width: 100%" height="500px">
    <el-table-column
        fixed
        prop="id"
        label="id"
        width="150"
    >
    </el-table-column>

    <el-table-column
        prop="officeUid"
        label="officeUid"
        width="150"
    >
    </el-table-column>

    <el-table-column
        prop="location"
        label="地址"
        style="width: 50%"
    >
    </el-table-column>

    fixed="right"
    <el-table-column

        label="操作"
        width="150">
      <template slot-scope="scope">
        <el-button @click="find(scope.row)" type="text" size="medium">查看汽车</el-button>
<!--        <el-button @click="del(scope.row)" type="text" size="medium">删除</el-button>-->
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
export default {
  methods: {
    find(row) {

      this.$router.push({
        path:'/user/office/cars',
        query:{
          officeUid:row.officeUid
        }
      })
      console.log(row);
    },
    // del(row){
    //   const _this = this
    //   axios.delete('http://localhost:8182/office/delete/' + row.id).then(function (resp){
    //     console.log(resp)
    //     if (resp.status === 200){
    //       _this.$alert('success', 'Delete Car', {
    //         confirmButtonText: 'ok',
    //         callback: action => {
    //           window.location.reload()
    //         }
    //       });
    //     }
    //   })
    //
    // }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8182/offices/findall').then(function (resp) {
      _this.tableData = resp.data
      // _this.total = resp.data.length
      // console.log(resp);
    })
  },
  data() {
    return {
      tableData: [{
        id: '',
        officeUid:'',
        location: '',
      }]
    }
  }
}
</script>