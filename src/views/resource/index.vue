<template>
  <div class="dashboard-editor-container">
    <Title title="资源概览"></Title>
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row class="progress-content">
      <div class="progress-item">
        <span>节点：</span>
        <el-select v-model="value8" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <line-chart class="progress-item" :chart-data="lineChartData"/>
      <line-chart class="progress-item" :chart-data="lineChartData"/>
      <line-chart class="progress-item" :chart-data="lineChartData"/>
    </el-row>
    </el-row>
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
      },],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: ''
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
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.progress-content {
    background:#fff;padding:16px 16px 0;margin-bottom:32px;
    .progress-item {
      width: 100%;
    }
  }
</style>
