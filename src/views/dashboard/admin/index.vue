<template>
  <div class="dashboard-editor-container">
    <Title title="故障告警"></Title>
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <Title title="资源概览"></Title>
    <el-row class="progress-content">
      <div class="progress-item" v-for="(item, index) in progressList" :key="index">
        <h5>{{item.label}}</h5>
        <el-progress type="circle" :percentage="item.percent" :color="item.color"></el-progress>
        <p>{{item.value}}</p>
      </div>
      <!-- <line-chart :chart-data="lineChartData"/> -->
    </el-row>

    <Title title="训练任务"></Title>
    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import PanelGroup from '@/components/PanelGroup'
import LineChart from '@/components/LineChart'
import RaddarChart from '@/components/RaddarChart'
import PieChart from '@/components/PieChart'
import BarChart from '@/components/BarChart'
import TransactionTable from '@/components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

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
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      progressList: [{
        label: '节点在线率',
        percent: 90,
        color: '#5dbf99',
        value: `总数量(台)：${10}`
      },  {
        label: 'CPU使用率',
        percent: 55,
        color: '#8e71c7',
        value: `总数量(个)：${20}`
      }, {
        label: 'GPU使用率',
        percent: 20,
        color: '#fb5130',
        value: `总数量(个)：${20}`
      }, {
        label: '内存使用率',
        percent: 55,
        color: '#8e71c7',
        value: `总数量(个)：${20}`
      },{
       label: '存储使用率',
        percent: 90,
        color: '#5dbf99',
        value: `总数量(个)：${20}`
      },]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    init() {
      this.$api.getOverviewData().then(res => {
        console.log(res);
        
      })
    }
  },
  created() {
    this.init();
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
    display: flex;
    .progress-item {
      flex: 1;
      text-align: center;
      h5 {
        // text-align: center;
      }
    }
  }
</style>
