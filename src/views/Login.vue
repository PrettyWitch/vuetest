<template>
<div>
  <el-form style="width: 70%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="register('ruleForm')">注册</el-button>
            <el-button @click="test()">test</el-button>
    </el-form-item>
  </el-form>
</div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入account', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入password', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    test(){
      console.log(this.ruleForm)
    },
    submitForm: function (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8183/user/login', this.ruleForm).then(function (resp) {
            console.log(resp)
            if (resp.status === 200) {
              console.log("true")
              _this.$alert('success', 'Login', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/user/office')
                }
              });
            }else{
              console.log("false")
              _this.$alert('Incorrect username or password', 'Login', {
                confirmButtonText: 'ok',
                callback: action => {
                  window.location.reload()
                }
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    register(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // console.log(_this.ruleForm)
          axios.post('http://localhost:8183/user/create', this.ruleForm).then(function (resp){
            console.log(resp)
            if (resp.data === 'success'){
              _this.$alert('success', 'Register', {
                confirmButtonText: 'ok',
                callback: action => {
                  _this.$router.push('/user/office')
                }
              });
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });

      // this.$refs[formName].resetFields();
    }
  }
}
</script>