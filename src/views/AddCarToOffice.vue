<template>
  <el-form style="width: 70%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

    <!--    <el-form-item label="carUid" prop="carUid">-->
    <!--      <el-input v-model="ruleForm.carUid"></el-input>-->
    <!--    </el-form-item>-->

    <!--    <el-form-item label="officeUid" prop="officeUid">-->
    <!--      <el-input v-model="ruleForm.officeUid"></el-input>-->
    <!--    </el-form-item>-->

    <el-form-item label="officeUid" prop="officeUid">
      <el-input v-model="ruleForm.officeUid" readonly></el-input>
    </el-form-item>
    <el-form-item label="carUid" prop="carUid">
      <el-input v-model="ruleForm.carUid"></el-input>
    </el-form-item>
    <el-form-item label="registrationNumber" prop="registrationNumber">
      <el-input v-model="ruleForm.registrationNumber"></el-input>
    </el-form-item>

    <el-form-item label="availableSchedule" prop="availableSchedule">
      <el-input v-model="ruleForm.availableSchedule" placeholder="示例：2021-06-01:2021-08-01"></el-input>
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
      availableCars: {
        carUid: '',
        officeUid: '',
        registrationNumber: '',
        availableSchedule: '',
        // officeUid: [],
      },
      ruleForm: {
        carUid: '',
        officeUid: '',
        registrationNumber: '',
        availableSchedule: ''
      },

      rules: {
        carUid: [
          {required: true, message: '请输入carUid', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        // officeUid: [
        //   {required: true, message: '请输入officeUid', trigger: 'blur'},
        //   {min: 1, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        // ],
        registrationNumber: [
          {required: true, message: '请输入registrationNumber', trigger: 'blur'},
          {min: 1, max: 9, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        availableSchedule: [
          {required: true, message: '请输入availableSchedule', trigger: 'blur'},
          {min: 1, max: 21, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    test() {
      // this.carInfo.carUid = this.ruleForm.carUid
      this.availableCars.carUid = this.ruleForm.carUid
      this.availableCars.officeUid = this.ruleForm.officeUid
      this.availableCars.registrationNumber = this.ruleForm.registrationNumber
      this.availableCars.availableSchedule = this.ruleForm.availableSchedule
      console.log(this.availableCars)

    },
    //11.在办公室添加新车。[A] [M] [G]
    //POST /offices/{officeUid}/car/{carUid}
    //body: { registration_number, available }
    submitForm: function (formName) {
      this.availableCars.carUid = this.ruleForm.carUid
      this.availableCars.officeUid = this.ruleForm.officeUid
      this.availableCars.registrationNumber = this.ruleForm.registrationNumber
      this.availableCars.availableSchedule = this.ruleForm.availableSchedule
      console.log(this.availableCars)

      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // console.log(_this.ruleForm)
          // const params = new URLSearchParams();
          // params.append('registrationNumber', this.availableCars.registrationNumber)
          // params.append('availableSchedule', this.availableCars.availableSchedule)
          // console.log(params)
          let registrationNumber = _this.ruleForm.registrationNumber
          let availabilitySchedules = _this.ruleForm.availableSchedule
          let availableCar = {'registrationNumber': registrationNumber, 'availableSchedule':availabilitySchedules}
          console.log(availableCar)
          // let qs = require(availableCar); 2021-06-01:2021-08-01
          axios.post('http://localhost:8182/offices/' + this.availableCars.officeUid + '/car/' + this.availableCars.carUid, {
            'registrationNumber': registrationNumber, 'availabilitySchedules':availabilitySchedules
          }).then(function (resp) {
            console.log(resp)
            if (resp.status === 200) {
              _this.$alert('success', 'AddCar', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/admin/office')
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
  created() {
    const _this = this
    axios.get('http://localhost:8182/offices/' + this.$route.query.officeUid).then(function (resp) {
      _this.ruleForm= resp.data

    })
  }
}

</script>