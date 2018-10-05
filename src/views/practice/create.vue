<template>
  <div class="dashboard-editor-container">
    <Title :title="title"></Title>
    <Role @toggleRadio="chackRadio" :ruleForm="ruleForm" :addRole="false">
      <div slot="end">
        <el-button :disabled="ifAdd==1" type="text" icon="el-icon-circle-plus" @click="addRole">添加角色</el-button>
      </div>
    </Role>

    <component :is="item.component" :addRole="item.addRole" :ruleForm="item.ruleForm" v-for="item in roles"></component>

    <el-button style="margin-left: 15rem;" type="primary" @click="submitForm('ruleForm')">确认</el-button>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Role from "./components/Role.vue";
export default {
  components: {
    Title,
    Role
  },
  data() {
    return {
      ruleForm: {},
      ifAdd: 1,
      roles: [],
    };
  },
  computed: {
    title() {
      return this.$route.query.id ? "修改训练" : "创建训练";
    }
  },
  methods: {
    chackRadio(value) {
      this.ifAdd = value;
    },
    submitForm(formName) {
      console.log(this.roles);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addRole() {
      this.roles.push({
        component: Role,
        addRole: true,
        ruleForm: {

        }
      })
    },
    fetchDate() {}
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchDate"
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