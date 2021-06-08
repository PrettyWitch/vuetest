<template>
  <el-form style="width: 70%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


    <el-form-item label="location" prop="location">
      <el-input v-model="ruleForm.location"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--      <el-button @click="test()">test</el-button>-->
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        location: ''
      },
      rules: {
        location: [
          { required: true, message: '请输入location', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    test(){
      console.log(this.ruleForm)
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8182/office/create', this.ruleForm).then(function (resp){
            console.log(_this.ruleForm)
            if (resp.data === 'success'){
              _this.$alert('success', 'AddOffice', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/admin/office')
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
      this.$refs[formName].resetFields();
    }
  }
}
</script>