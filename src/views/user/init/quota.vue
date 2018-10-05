<template>
<div>
  <h1>您的资源配额</h1>
  <div class="quato_container">
    <div class="chart">
      <pie-chart :chartData="quato" height="350px"/>
    </div>
    <p>
      平台管理员为您分配了资源配额，包括计算资源和存储资源，这是您在平台同时使用的资源上限，您将可以使用配额资源进行AI模型训练，创建实验室，模型服务等。
    </p>   
  </div>
  <el-button class="next_btn" type="primary" @click="nextHandler">
    下一步
  </el-button>
</div>
  
</template>

<script>
import PieChart from '@/components/PieChart'
export default {
  name: 'quato',
  components: {
    PieChart
  },
  data() {
    return {
      quato: {
        legend: ['CPU', 'GPU', '内存', '存储'],
        series: {
          name: '资源配置',
          data: [{
            name: 'CPU', value: 3
          }, {
            name: 'GPU', value: 10
          }, {
            name: '内存', value: 50
          }, {name: '存储', value: 100
          }]
        }
      }
    }    
  },
  methods: {
    nextHandler() {
      this.$router.push({ path: "/init/user/laboratory" });                            
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
h1 {
  text-align: center;
  color: #333;
}
.quato_container {
  display: flex;
  padding: 3rem;
  .chart {
    flex: 1;
  }
  p {
    flex: 1;
    color: #666;
    line-height: 3rem;
    margin-top: 5rem;
    margin-right: 12rem;
  }
}
.next_btn {
  margin-left: 39rem;
}
</style>


