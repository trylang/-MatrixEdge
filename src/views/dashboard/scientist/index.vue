<template>
  <div class="dashboard-editor-container">
    <Title title="训练状态"></Title>
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <Title title="训练概览"></Title>
    <!-- <el-row class="progress-content">
      <div class="progress-item" v-for="(item, index) in progressList" :key="index">
        <h5>{{item.label}}</h5>
        <el-progress type="circle" :percentage="item.percent" :color="item.color"></el-progress>
        <p>{{item.value}}</p>
      </div>
    </el-row> -->

    <Title title="资源概览"></Title>
    <el-row class="progress-content">
      <div class="progress-item" v-for="(item, index) in progressList" :key="index">
        <h5>{{item.label}}</h5>
        <el-progress class="progeree" :text-inside="true" :stroke-width="14" :percentage="item.percent" :color="item.color"></el-progress>
      </div>
      <!-- <line-chart :chart-data="lineChartData"/> -->
    </el-row>

  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import PanelGroup from '@/components/PanelGroup'
import LineChart from '@/components/LineChart'
import PieChart from '@/components/PieChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    Title,
    PanelGroup,
    PieChart, 
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      progressList: [{
        label: 'GPU',
        percent: 80,
        color: '#5dbf99',
        value: `总数量(台)：${10}`
      },  {
        label: 'CPU',
        percent: 20,
        color: '#8e71c7',
        value: `总数量(个)：${20}`
      }, {
        label: '内存',
        percent: 55,
        color: '#8e71c7',
        value: `总数量(个)：${20}`
      },{
       label: '存储空间',
        percent: 90,
        color: '#5dbf99',
        value: `总数量(个)：${20}`
      },]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.progress-content {
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
    .progress-item {
      display: flex;
      h5 {
        width: 5rem;
      }
      .progeree {
        flex: 1;
        line-height: 3rem;
      }
    }
    
  }
</style>
