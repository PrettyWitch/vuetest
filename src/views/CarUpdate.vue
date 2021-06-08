<template>
  <el-form style="width: 70%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="id">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>

    <el-form-item label="carUid">
      <el-input v-model="ruleForm.carUid" readonly></el-input>
    </el-form-item>

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

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        carUid:'',
        brand: '',
        model: '',
        power: '',
        type: ''
      },
      rules: {
        brand: [
          { required: true, message: '请输入brand', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请输入model', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        power: [
          { required: true, message: '请输入power', trigger: 'blur' },
          { min: 1, max: 9, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择type', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/car/update', this.ruleForm).then(function (resp){
            console.log(resp)
            if (resp.data === 'success'){
              _this.$alert('success', 'CarUpdate', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/admin/car')
                }
              });

            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      const _this = this
      axios.get('http://localhost:8181/car/' + this.$route.query.carUid).then(function (resp){
        _this.ruleForm = resp.data
      })
      // this.$refs[formName].resetFields();
    }
  },
  created(){
    const _this = this
    axios.get('http://localhost:8181/car/' + this.$route.query.carUid).then(function (resp){
      _this.ruleForm = resp.data
    })
  }
}
</script>