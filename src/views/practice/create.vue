<template>
  <div class="dashboard-editor-container">
    <Title :title="title"></Title>
    <el-form class="form_content" ref="ruleForm" label-width="140px" v-for="(role, index) in roles" :key="index">
      <template v-if="!role.addRole">
        <el-form-item label="训练名称：">
          <el-input type="text" v-model="role.name" auto-complete="off" placeholder="请输入训练名称"></el-input>
        </el-form-item>

        <el-form-item label=""> 
          <el-radio-group v-model="role.radio" @change="chackRadio">
            <el-radio :label="1">单机</el-radio>
            <el-radio :label="2">分布式</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <el-form-item label="角色：">
        <el-select v-model="role.role" :disabled="(!role.addRole)&&(role.radio==1)" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="引擎选择：">
        <el-select v-model="role.engine" placeholder="请选择">
          <el-option
            v-for="item in [{label: 'Tensorflow 1.8 GPU', value: 'Tensorflow 1.8 GPU'}, {label: 'Tensorflow 1.8 CPU', value: 'Tensorflow 1.8 CPU'}, {label: 'Tensorflow 1.5 CPU', value: 'Tensorflow 1.5 CPU'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="语言选择：">
        <el-select v-model="role.language" placeholder="请选择">
          <el-option
            v-for="item in [{label: 'Python', value: 'Python'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="训练PY文件路径：">
        <label for="fileinp">
          <input type="button" class="filebtn" value="浏览"><span class="text">路径</span>
          <input type="file" class="fileinp">
        </label>
      </el-form-item>

      <el-form-item label="初始化参数：">
        <span style="cursor: pointer;" @click="addInit(index)"><i class="el-icon-circle-plus"></i>  添加初始化参数</span>
        <div class="init_param" v-for="(item, index) in role.initParamList" :key="index">
          <el-input class="param_item" type="text" v-model="item.name" auto-complete="off" placeholder="name"></el-input>
          <el-input class="param_item" type="text" v-model="item.value" auto-complete="off" placeholder="value"></el-input>
          <i class="el-icon-delete param_item param_item_icon" @click="deleteInitParam(index, item)"></i>
        </div>
      </el-form-item>

      <el-form-item label="结果存放路径：">
        <label for="fileinp">
          <input type="button" class="filebtn" value="浏览"><span class="text">路径</span>
          <input type="file" class="fileinp">
        </label>
      </el-form-item>

      <el-form-item  label="GPU(个)：">
        <el-slider :min="0" :max="15"  v-model="role.gpu"></el-slider>
      </el-form-item>
      <el-form-item label="CPU(个)：">
        <el-slider :min="0" :max="15"  v-model="role.cpu"></el-slider>
      </el-form-item>

      <el-form-item label="内存(GB)：">
        <el-slider :min="0" :max="30"  v-model="role.gb"></el-slider>
      </el-form-item>

    </el-form>
    
    <div class="footer">
      <el-button class="addRole" :disabled="ifAdd==1" type="text" icon="el-icon-circle-plus" @click="addRoleHandler">添加角色</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
    </div>

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
      ruleForm: {
        radio: 1
      },
      ifAdd: 1,
      roles: [{
        radio: 1,
        initParamList: [{
          name: '',
          value: ''
        }],
      }],
      addRole: false,
      initParamList: [{
        name: '',
        value: ''
      }],
      options: [
        {
          label: "Chief",
          value: "Chief"
        },
        {
          label: "Worker",
          value: "Worker"
        },
        {
          label: "PS",
          value: "PS"
        },
        {
          label: "Eval",
          value: "Eval"
        }
      ],
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
      this.$msg('success', '创建训练成功');
      this.$router.push({path: '/practice/index'});
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    addRoleHandler() {
      this.roles.push({
        addRole: true,
        initParamList: [{
          name: '',
          value: ''
        }],
        ruleForm: {}
      })
    },
    addInit(index) {
      this.roles[index].initParamList.unshift({name: '', value: ''});
    },
    deleteInitParam(index, item) {
      this.roles[index].initParamList.splice(index, 1);
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
.form_content {
  width: 32rem;
  margin: 2rem auto;
  label {
    position: relative;
  }
  .fileinp {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .filebtn {
    padding: 5px 10px;
    background: #0d9dff;
    color: #FFF;
    border: none;
    border-radius: 5px;
  }
  .text {
    padding-left: 1rem;
    color: #666;
  }
  .init_param {
    display: flex;
    padding-bottom: .5rem;
    .param_item {
      padding-right: 1rem;
    }
    .param_item_icon {
      line-height: 2rem;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .addRole {
    margin-left: -22rem;
  }
}
</style>