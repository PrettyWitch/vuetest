<template>
  <el-form style="width: 70%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

<!--    <el-form-item label="carUid" prop="carUid">-->
<!--      <el-input v-model="ruleForm.carUid"></el-input>-->
<!--    </el-form-item>-->

    <!--    <el-form-item label="officeUid" prop="officeUid">-->
    <!--      <el-input v-model="ruleForm.officeUid"></el-input>-->
    <!--    </el-form-item>-->

    <el-form-item label="brand" prop="brand">
      <el-input v-model="ruleForm.brand"></el-input>
    </el-form-item>
    <el-form-item label="model" prop="model">
      <el-input v-model="ruleForm.model"></el-input>
    </el-form-item>
    <el-form-item label="power" prop="power">
      <el-input v-model="ruleForm.power"></el-input>
    </el-form-item>

    <el-form-item label="type" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择type">
        <el-option label="SEDAN" value="SEDAN"></el-option>
        <el-option label="SUV" value="SUV"></el-option>
        <el-option label="MIVIVAN" value="MIVIVAN"></el-option>
        <el-option label="ROADSTER" value="ROADSTER"></el-option>
      </el-select>
    </el-form-item>

    <!--选择Office-->
<!--    <div style="margin: 20px 0 20px 50px">-->
<!--      <el-table-->
<!--          ref="multipleTable"-->
<!--          :data="tableData"-->
<!--          tooltip-effect="dark"-->
<!--          border-->
<!--          style="width: 100%"-->
<!--          max-height="250"-->
<!--          @selection-change="handleSelectionChange">-->
<!--        <el-table-column-->
<!--            type="selection"-->
<!--            width="55">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="id"-->
<!--            width="120">-->
<!--          &lt;!&ndash;        <template slot-scope="scope">{{ scope.row.date }}</template>&ndash;&gt;-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="officeUid"-->
<!--            label="officeUid"-->
<!--            width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="location"-->
<!--            label="地址"-->
<!--            show-overflow-tooltip>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="test()">test</el-button>
    </el-form-item>
  </el-form>
</template>


<script>


export default {
  data() {
    return {
      carInfo: {
        // carUid: '',
        brand: '',
        model: '',
        power: '',
        type: '',
        // officeUid: [],
      },
      ruleForm: {
        // carUid: '',
        brand: '',
        model: '',
        power: '',
        type: ''
      },
      // tableData: [{
      //   id: 1,
      //   officeUid: 1,
      //   location: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   id: 2,
      //   officeUid: 2,
      //   location: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   id: 3,
      //   officeUid: 3,
      //   location: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   id: 4,
      //   officeUid: 14,
      //   location: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   id: 12,
      //   officeUid: 12,
      //   location: '上海市普陀区金沙江路 1518 弄'
      // }],
      // multipleSelection: [],
      // officeUid: [],


      rules: {
        // carUid: [
        //   {required: true, message: 'carUid', trigger: 'blur'},
        //   {min: 1, max: 2, message: '长度在 1 到 2个字符', trigger: 'blur'}
        // ],
        // officeUid: [
        //   {required: true, message: 'officeUid', trigger: 'blur'},
        //   {min: 1, max: 2, message: '长度在 1 到 2个字符', trigger: 'blur'}
        // ],
        brand: [
          {required: true, message: '请输入brand', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        model: [
          {required: true, message: '请输入model', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        power: [
          {required: true, message: '请输入power', trigger: 'blur'},
          {min: 1, max: 9, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择type', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    test() {
      // this.carInfo.carUid = this.ruleForm.carUid
      this.carInfo.brand = this.ruleForm.brand
      this.carInfo.model = this.ruleForm.model
      this.carInfo.power = this.ruleForm.power
      this.carInfo.type = this.ruleForm.type
      console.log(this.carInfo)

    },
    submitForm(formName) {
      this.carInfo.brand = this.ruleForm.brand
      this.carInfo.model = this.ruleForm.model
      this.carInfo.power = this.ruleForm.power
      this.carInfo.type = this.ruleForm.type
      console.log(this.carInfo)

      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // console.log(_this.ruleForm)
          axios.post('http://localhost:8181/car/create', this.carInfo).then(function (resp) {
            console.log(resp)
            if (resp.data === 'success') {
              _this.$alert('success', 'AddCar', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/admin/car')
                }
              });
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //
    //   const _this = this
    //   console.log(this.multipleSelection);
    //   this.officeUid = ''
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     console.log(_this.multipleSelection[i].officeUid);
    //     _this.officeUid += _this.multipleSelection[i].officeUid + ' '
    //   }
    //   console.log(this.officeUid)
    // }
  },
  // created() {
  //   const _this = this
  //   axios.get('http://localhost:8182/office/findall').then(function (resp) {
  //     _this.tableData= resp.data
  //
  //   })
  // }
}

</script>