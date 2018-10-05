<template>
  <div class="dashboard-editor-container">
    <Title title="更新用户信息"></Title>
    <el-form class="form_content" :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="120px">
      <el-form-item label="姓名：" prop="name">
        <el-input type="password" v-model="ruleForm.name" auto-complete="off" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input type="password" v-model="ruleForm.email" auto-complete="off" placeholder="请输入您的常用邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话号码：" prop="phone">
        <el-input type="password" v-model="ruleForm.phone" auto-complete="off" placeholder="可填固定电话或手机号"></el-input>
      </el-form-item>
      <el-form-item label="单位（部门）：" prop="department">
        <el-input type="password" v-model="ruleForm.department" auto-complete="off" placeholder="请填写单位（部门）全称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  components: {
    Title
  },
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        department: ""
      },
      rules2: {
        name: [
          { required: true, message: "请输入真是姓名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 50, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        phone: [
          { min: 0, max: 99999999999, message: '请输入正确的电话号吗', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.updateUser(this.ruleForm).then(res => {
          _this.$msg("success", "用户更新成功!");
          _this.getUserList();
        })
          .catch(error => {
            _this.$msg("error", !error.message? "无法修改，请重试!" : error.message);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
}
.form_content {
  width: 32rem;
  margin: 3rem auto;
}
</style>


