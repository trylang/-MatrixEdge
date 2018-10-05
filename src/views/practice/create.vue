<template>
  <div class="dashboard-editor-container">
    <Title :title="title"></Title>
    <el-form class="form_content" :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="120px">
      <el-form-item label="训练名称" prop="original_pass">
        <el-input type="password" v-model="ruleForm.original_pass" autocomplete="off" placeholder="本次成功登陆密码"></el-input>
      </el-form-item>
      <el-form-item label="修改密码：" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码长度为6-16位，仅限字母、数字、横线、下划线"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        original_pass: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        original_pass: [
          { required: true, message: "请输入本次登陆密码", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入修改密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    title() {
      return this.$route.query.id ? '修改训练' : '创建训练';
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fetchDate() {

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "fetchDate"
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