<template>
  <div class="dashboard-editor-container">

    <Title title="资源状态"></Title>
    <el-row class="progress-content">
      <div class="state-item" v-for="(item, index) in stateList" :index="index">
        <div class="left">
          <p><span>{{item.left[0]}}</span><strong>{{item.left[1]}}</strong></p>
          <p><img :src="item.imgUrl" alt=""></p>
        </div>
        <div class="right" v-if="item.right">          
          <el-progress type="circle" :percentage="item.right[4]"></el-progress>
          <div class="bottom">
            <p><span>{{item.right[0]}}</span><strong>{{item.right[1]}}</strong></p>
            <p><span>{{item.right[2]}}</span><strong>{{item.right[3]}}</strong></p>
          </div>
        </div>
      </div>
    </el-row>

    <el-row class="progress-content">
      <div class="resource-item" v-for="(item, index) in resourceList" :style="{background: item.background}" :key="index">
        <div class="item top">
          <p><span>{{item.top[0]}}</span><strong>{{item.top[1]}}</strong></p>
          <p><img :src="item.imgUrl" alt=""></p>
        </div>
        <div class="item">
          <p><span>{{item.bottom[0]}}</span><strong>{{item.bottom[1]}}</strong></p>
          <p><span>{{item.bottom[2]}}</span><strong>{{item.bottom[3]}}</strong></p>
        </div>
      </div>
    </el-row>

    <el-row class="progress-content">
      <div class="chart-item" v-for="(item, index) in chartList" :index="index">
        <h4>{{item.title}}</h4>
        <div style="border: 1px solid #ddd;">
          <LineChart v-if="item.type === 'line'" height="300px" :chart-data="lineChartData"></LineChart>
          <BarChart v-if="item.type === 'bar'"/>
        </div>
      </div>
    </el-row>

    <Title title="网络使用统计"></Title>
    <el-row class="progress-content">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated bounceInRight"
        leave-active-class="animated bounceOutRight">
        <div class="show-chart" v-if="chartShow">
          <el-button class="close-btn" @click="chartShow=false;" icon="el-icon-close" size="mini" circle></el-button>
          <LineChart class="echart" height="300px" :chart-data="lineChartData"></LineChart>
        </div>
      </transition>

      <div class="network-item" v-for="(item, index) in networkList" :index="index">
        <span>{{item.desc}}</span>
        <h4>{{item.title}}</h4>
        <div style="border: 1px solid #ddd;" @click="handleChart(lineChartData)">
          <LineChart height="300px" :chart-data="lineChartData"></LineChart>
        </div>
      </div>
    </el-row>

  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import PanelGroup from "@/components/PanelGroup";
import LineChart from "@/components/LineChart";
import RaddarChart from "@/components/RaddarChart";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import TransactionTable from "@/components/TransactionTable";
import userImg from "@/assets/user.jpg";
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
};

export default {
  name: "DashboardAdmin",
  components: {
    Title,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable
  },
  data() {
    return {
      chartShow: false,
      overData: {cpu: null, gpu: null, node: null, memory: null, storage: null},
      lineChartData: lineChartData.newVisitis,
      stateList: [{
        left: ['执行中训练任务', 2148],
        imgUrl: userImg,
      }, {
        left: ['GPU', 46],
        imgUrl: userImg,
        right: ['使用中', 13, '使用率', '29%', 29]
      }, {
        left: ['节点', 24],
        imgUrl: userImg,
        right: ['在线', 22, '在线率', '91%', 91]
      }],
      resourceList: [{
        top: ['显存', '10G'],
        imgUrl: userImg,
        background: 'rgba(27, 201, 142, 1)',
        bottom: ['使用中', '8G', '使用率', '80%'],
      },{
        top: ['CPU', '128'],
        imgUrl: userImg,
        background: 'rgba(201, 62, 78, 1)',
        bottom: ['使用中', '13', '使用率', '10%'],
      },{
        top: ['内存', '1024G'],
        imgUrl: userImg,
        background: 'rgba(139, 117, 223, 1)',
        bottom: ['使用中', '128G', '使用率', '20%'],
      },{
        top: ['存储', '16G'],
        imgUrl: userImg,
        background: 'rgba(247, 185, 15, 1)',
        bottom: ['使用中', '8T', '使用率', '50%'],
      }],
      chartList: [{
        title: 'GPU使用统计',
        type: 'line',
        data: []
      }, {
        title: '显存使用统计',
        type: 'line',
        data: []
      }, {
        title: 'CPU使用统计',
        type: 'bar',
        data: []
      }, {
        title: '内存使用统计',
        type: 'line',
        data: []
      }],
      networkList: [{
        title: '管理网',
        desc: 'Node#1 MASTER eth0--1G',
        data: []
      }, {
        title: '计算网',
        desc: 'Node#1 MASTER eth1--10G',
        data: []
      }, {
        title: '存储网',
        desc: 'Node#1 MASTER eth2--10G',
        data: []
      }]
    };
  },
  computed: {
    progressList() {
      let cpu = this.overData.cpu || {usage: 0, capacity: ''};
      let gpu = this.overData.gpu || {usage: 0, capacity: ''};
      let node = this.overData.node || {rate: 0, total: ''};
      let memory = this.overData.memory || {usage: 0, capacity: ''};
      let storage = this.overData.storage || {usage: 0, capacity: ''};
      return [
        {
          label: "节点在线率",
          percent: parseInt(node.rate),
          color: "#5dbf99",
          value: `总数量(台)：${node.total}`
        },
        {
          label: "CPU使用率",
          percent: parseInt(cpu.usage),
          color: "#8e71c7",
          value: `总数量(个)：${cpu.capacity}`
        },
        {
          label: "GPU使用率",
          percent: parseInt(gpu.usage/ 10),
          color: "#fb5130",
          value: `总数量(个)：${gpu.capacity}`
        },
        {
          label: "内存使用率",
          percent: parseInt(memory.usage),
          color: "#8e71c7",
          value: `总数量(G)：${memory.capacity}`
        },
        {
          label: "存储使用率",
          percent: parseInt(storage.usage),
          color: "#5dbf99",
          value: `总数量(G)：${storage.capacity}`
        }
      ];
    }
  },
  methods: {
    handleChart(data) {
      this.chartShow=true;
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    init() {
      this.$api.getOverviewData().then(res => {
        this.overData = res;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.p_span_strong {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 24px;
  }
}

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
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  
  .show-chart {
    width: 100%;
    margin-bottom: 2rem;
    position: relative;
    .close-btn {
      position: absolute;
      right: 0;
      z-index: 1;
    }
    .echart {
      margin-top: 1.5rem;
    }
  }
  .state-item {
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: space-around;
    border-right: 1px solid rgba(202, 180, 180, 0.35);
    &:first-of-type() {
      flex: 1;
    }
    &:last-of-type() {
      border-right: none;
    }
    .left {
       p {
         display: flex;
         flex-direction: column;
         strong {
           font-size: 24px;
         }
         img {
            width: 80px;
            height: 80px;
          }
       }
    }
    .right {
      display: flex;
      flex-direction: column;
      .bottom {
        display: flex;
        p {
          @extend .p_span_strong;
        }
        
      }
    }
  }

  .resource-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 270px;
    height: 235px;
    margin-right: 30px;
    justify-content: space-around;
    color: #fff;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        @extend .p_span_strong;
      }
      img {
        width: 80px;
        height: 80px;
      }
    }
    .top {
      height: 60%;
      border-bottom: 1px solid rgba(202, 180, 180, 0.35);
    }
  }

  .chart-item {
    width: 47%;
    margin-right: 2rem;
  }

  .network-item {
    flex: 1;
    margin-right: 2rem;
    span {
      font-size: 12px;
      color: #555;
    }
    h4 {
      color: #333;
    }
  }

}
</style>
