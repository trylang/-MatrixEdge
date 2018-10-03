<template>
  <el-dialog
      :title="title"
      :visible.sync="dialog.dialogVisible"
      :before-close="dialog.handleClose">
      <el-form class="form-content" ref="form" :model="dialog.param" :status-icon="dialog.statusIcon" :rules="dialog.rules" label-width="8rem">
        <el-form-item v-for="(model,index) in dialog.models" :key="index" 
        :prop="model.name" :label="model.label" :rules="model.rules">
          <el-input v-if="model.type==='text' || model.type==='number'" v-model="dialog.param[model.name]" :type="model.type" :placeholder="model.placeholder"></el-input>
          <el-select v-if="model.type==='select'" v-model="dialog.param[model.name]">
            <el-option
              v-for="(item, index) in model.options"
              :key="index"
              :label="item.label"
              :value="item[model.value]">
            </el-option>
          </el-select>
          <el-date-picker
            v-if="model.type==='date'"
            v-model="dialog.param[model.name]"
            :type="model.type"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-slider v-if="model.type==='slider'" :min="model.min" :max="model.max" :disabled="model.disabled" v-model="dialog.param[model.name]"></el-slider>
        <Title style="margin-left: -8rem;" v-if="model.type==='title'" :title="model.title"></Title>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-for="(option,index) in dialog.options" :key="index" :type="option.type" :disabled="option.disabledFun?option.disabledFun(dialog.param):option.disabled" @click="handleClick('form', option)">{{option.label}}</el-button>
      </span>
    </el-dialog>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  components: {
    Title
  },
  props: ["title", "dialog"],
  methods: {
    handleClick(formName, option) {
      this[option.name](formName, option.click);
    },
    submit(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    reset(formName, callback) {
      this.$refs[formName].resetFields();
      callback();
    }
  }
};
</script>

<style>
.form-content {
  padding-right: 1.5rem;
}
</style>

