<template>
  <el-form class="form_content" ref="ruleForm" label-width="140px">
    <template v-if="!addRole">
      <el-form-item label="训练名称：">
        <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder="请输入训练名称"></el-input>
      </el-form-item>

      <el-form-item label=""> 
        <el-radio-group v-model="ruleForm.radio" @change="toggleRadio">
          <el-radio :label="1">单机</el-radio>
          <el-radio :label="2">分布式</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>

    <el-form-item label="角色：">
      <el-select v-model="ruleForm.role" :disabled="(!addRole)&&(ruleForm.radio==1)" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="引擎选择：">
      <el-select v-model="ruleForm.engine" placeholder="请选择">
        <el-option
          v-for="item in [{label: 'Tensorflow 1.8 GPU', value: 'Tensorflow 1.8 GPU'}]"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="语言选择：">
      <el-select v-model="ruleForm.language" placeholder="请选择">
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
      <span style="cursor: pointer;" @click="addInit"><i class="el-icon-circle-plus"></i>  添加初始化参数</span>
      <div class="init_param" v-for="(item, index) in initParamList" :key="index">
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
      <el-slider :min="10" :max="90"  v-model="ruleForm.gpu"></el-slider>
    </el-form-item>
    <el-form-item label="CPU(个)：">
      <el-slider :min="10" :max="90"  v-model="ruleForm.cpu"></el-slider>
    </el-form-item>

    <el-form-item label="内存(GB)：">
      <el-slider :min="10" :max="90"  v-model="ruleForm.gb"></el-slider>
    </el-form-item>

    <slot name="end"></slot>  

  </el-form>
</template>

<script>
export default {
  props: {
    addRole: {
      type: Boolean,
      value: false
    },
  },
  data() {
    return {
      value: "",
      initParamList: [{
        name: '',
        value: ''
      }],
      ruleForm: {
        name: '',
        engine: '',
        role: '',
        language: '',
        radio: 1
      },
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
      ]
    };
  },
  methods: {
    toggleRadio() {
      this.$emit('toggleRadio', this.ruleForm.radio);
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    addInit() {
      this.initParamList.unshift({name: '', value: ''});
    },
    deleteInitParam(index, item) {
      this.initParamList.splice(index, 1);
      console.log(this.initParamList);
    },
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
</style>