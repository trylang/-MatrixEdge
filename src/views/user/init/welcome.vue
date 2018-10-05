<template>
  <div class="welcome_container">
    <img :src="welcome" alt="欢迎页">
    <div class="welcome_right">
      <h1>欢迎来到MatrixEdge</h1>
      <p>在MatrixEdge ，您可以在线编写代码，轻松上传数据集，一键启动复杂的训练任务并实时监控训练状态，完成模型服务发布。MatrixEdge 为AI模型生产的设计了完整服务workflow。
        让MatrixEdge 帮助您节省学习和操作的时间，提升开发效率，轻松管理大规模计算能力，让您用更多的时间去探索更好的创意。</p>
     
      <div class="know">
        <span>接下来您将</span>
        <ul>
          <li>了解您的可用资源配额</li>
          <li>创建自己的AI工作空间</li>
          <li>自主使用个人平台服务</li>
        </ul>
      </div>
      <el-button class="next_btn" type="primary" @click="nextHandler">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import welcome from '@/assets/welcome.jpg';
export default {
  name: 'welcome',
  data() {
    return {
      welcome
    }    
  },
  methods: {
    nextHandler() {
      this.$router.push({ path: "/init/user/quota" });                            
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.welcome_container {
  display: flex;
  img {
    width: 45%;
  }
  .welcome_right {
    flex: 1;
    padding: 3%;
    h1 {
      color: #333;
    }
    p {
      height: 15rem;
      line-height: 3rem;
      color: #666;
    }
    .know {
      span {
        color: #666;
      }
      ul {
        li {
          line-height: 2.4rem;
          color: #666;
        }
      }
    }
    .next_btn {
      float: right;
    }
  }
}
</style>

