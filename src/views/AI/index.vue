<template>
  <div class="lab_content">
    <div class="lab_left">
      <header>
        <img :src="labImg" alt="">
        <h1>初始化实验室</h1>
      </header>
      <div class="form_init">
        <div v-if="showInit" class="init_content">
          <strong>Tensorflow-1.5-CPU-4C-4Men</strong>
          <div class="init_info">
            <p>提示：工具Tensorflow 1.5 CPU版本</p>
            <p>4CPU</p>
            <p>4G内存</p>
          </div>
          <div class="btn_content">
            <el-button class="btn" type="primary" @click="confirmHandler">下一步</el-button>  
            <el-button class="btn" @click="showInit=false;">自定义</el-button>        
          </div>         
        </div>
        <div v-else class="form_content">
          <div class="form_item">
            <span class="form_label">训练工具：</span>
            <el-select v-model="param.image" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form_item">
            <span class="form_label"></span>
            <el-checkbox v-model="param.ifgpu">GPU</el-checkbox>
          </div>
          <div class="form_item">
            <span class="form_label">CPU（个）</span>
            <el-slider class="form_sel" style="width: 12rem;" v-model="param.cpu_guarantee" :min="0" :max="25"></el-slider>
            <strong>推荐值：4</strong>
          </div>
          <div class="form_item">
            <span class="form_label">内存（GB）</span>
            <el-slider class="form_sel" style="width: 12rem;"  v-model="param.mem_guarantee" :min="0" :max="25"></el-slider>
            <strong>推荐值：4</strong>
          </div>
          <div class="form_item">
            <span class="form_label">GPU（个）</span>
            <el-input-number class="form_sel" :disabled="param.ifgpu !=1" v-model="param.extra_resource_limits" :min="0" :max="4" label="描述文字"></el-input-number>
            <strong>推荐值：0</strong>
          </div>
          <el-button class="customer_btn" type="primary" @click="confirmHandler">确定</el-button>
        </div>
      </div>
    </div>

    <div class="lab_right">
     <p class="info_content">{{desc}}</p>
     <img :src="sampleImg" alt="示例">
    </div>
  </div>
</template>

<script>
import labImg from '@/assets/laboratory.png';
import sampleImg from '@/assets/sample.gif';

export default {
  data() {
    return {
      labImg,
      sampleImg,
      showInit: true,
      param: {
        ifgpu: false,
        image: 'gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-cpu:v0.2.1',
        cpu_guarantee: 4,
        mem_guarantee: 4,
        extra_resource_limits: 0
      },
      options: [{
        label: 'Tensorflow 1.8 CPU',
        value: 'Tensorflow 1.8 CPU'
      }, {
        label: 'Tensorflow 1.4.1 CPU',
        value: 'gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-cpu:v0.2.1'
      }
      // ,{
      //   label: 'Tensorflow 1.8 GPU',
      //   value: 'Tensorflow 1.8 GPU'
      // }, {
      //   label: 'Tensorflow 1.6 GPU',
      //   value: 'Tensorflow 1.6 GPU'
      // }
      ]
    }
  },
  computed: {
    desc() {
      let simple1 = '通过创建实验室，平台提供了在线交互式的AI开发，模型测试，代码测试数据集管理的综合工作环境，实验室提供TensorFlow和python的多版本支持，并拥有固定的资源空间。未来您也可以通过重置实验室保存已有数据而修改您的实验室可选项。';
      let simple2 = '创建您的第一个实验室环境，可在此环境种编写相关算法，进行算法调试。1、选择工具目前支持Tensorflow; 2、按需选择您的实验室配置。';
      return this.showInit ? simple1: simple2;
    }
  },
  methods: {
    confirmHandler() {
      let param = {
        image: this.param.image,
        cpu_guarantee: this.param.cpu_guarantee,
        mem_guarantee: `${this.param.mem_guarantee}Gi`,
        extra_resource_limits: `nvidia.com/gpu: ${this.param.extra_resource_limits}`
      };
      if (this.param.extra_resource_limits == 0) delete param.extra_resource_limits;
      this.$api.addHub(param).then(res => {
        if (this.$route.name === 'init_user_laboratory') {
          this.$alert('开启您的AI之旅', '完成', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/');
            }
          });
        }else {
          local
          this.$router.push({ path: "/AI/info", query: {...res}}); 
        }
      });      
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lab_content {
  padding: 3rem;
  display: flex;
  .lab_left {
    width: 100%;
    header{
      display: flex;
      justify-content: center;
      padding-right: 2rem;
      img {
        width: 100px;
        height: 100px;
      }
      h1 {
        height: 6rem;
        line-height: 5rem;
        margin-left: 2rem;
        color: #333;
      }
    }
    .form_init {
      padding: 2rem;
      .init_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        strong {color: #666;}
        .init_info {
          width: 100%;
          margin-top: 2rem;
          background: #eee;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 7rem;
          line-height: 0rem;
          color: #666;
        }
        .btn_content {
          margin-top: 2rem;
        }
      }
      .form_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .form_item {
          display: flex;
          margin: 1rem 0;
          .form_label {
            width: 7rem;
          }
          .form_sel {
            flex: 1;
          }
          strong {
            margin-left: 2rem;
          }
        }
        .customer_btn {
          margin-top: 2rem;
          width: 5rem;
        }
      }
    }
  }

  .lab_right {
    margin-top: 2rem;
    padding-right: 1rem;
    p {
      color: #525252;
      height: 9.6rem;
      line-height: 2.5rem;
    }
  }
}

</style>
