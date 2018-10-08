<template>
  <div class="dashboard-editor-container">
    <Title title="告警统计"></Title>
    <el-row class="progress-content">
      <Table :header="header" :content="content"></Table>
    </el-row>

    <Title title="节点管理">
      <el-button type="primary">新增节点</el-button>
    </Title>
    <el-row class="progress-content">
      <div class="filter-content">
        <div class="filter-item">
          <span>名称：</span>
          <el-input v-model="param.name" placeholder="请输入名称"></el-input>
        </div>
        <div class="filter-item">
          <span>IP：</span>
          <el-select v-model="value8" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <span>状态：</span>
          <el-select v-model="value8" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div> 

      <Table :header="nodeHeader" :content="nodeContent"></Table>
    </el-row>

    <el-dialog
      title="资源分配概览"
      :visible.sync="detail.dialogVisible"
      width="76%">
      <div>
        <Title title="主机名：MASTEr-1"></Title>
        <div class="chart_content">
          <div class="chart_item" v-for="(quato, index) in quatos" :key="index">
            <pie-chart :chartData="quato" height="350px"/>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";
import PieChart from "@/components/PieChart";
import { alertHeader, nodeHeader } from "./static.js";
export default {
  name: "DashboardAdmin",
  components: {
    Title,
    Table,
    PieChart
  },
  data() {
    return {
      progressList: [
        {
          label: "节点在线率",
          percent: 90,
          color: "#5dbf99",
          value: `总数量(台)：${10}`
        },
        {
          label: "CPU使用率",
          percent: 55,
          color: "#8e71c7",
          value: `总数量(个)：${20}`
        },
        {
          label: "GPU使用率",
          percent: 20,
          color: "#fb5130",
          value: `总数量(个)：${20}`
        },
        {
          label: "内存使用率",
          percent: 55,
          color: "#8e71c7",
          value: `总数量(个)：${20}`
        },
        {
          label: "存储使用率",
          percent: 90,
          color: "#5dbf99",
          value: `总数量(个)：${20}`
        }
      ],
      options: [],
      value8: "",
      param: {},
      header: alertHeader,
      nodeHeader: nodeHeader.concat({
        label: "操作",
        name: "operations",
        type: "buttons",
        style: {
          width: "130px"
        },
        operations: [
          {
            label: "详情",
            name: "info",
            type: "btn",
            btntype: "primary",
            click: item => {
              Object.assign(this.detail.data, item);
              this.detail.dialogVisible = true;
              this.quatos = [
                {
                  legend: ["CPU总资源", "CPU分配数", "CPU使用率"],
                  series: {
                    name: "资源配置",
                    data: [
                      {
                        name: "CPU总资源",
                        value: 10
                      },
                      {
                        name: "CPU分配数",
                        value: 5
                      },
                      {
                        name: "CPU使用率",
                        value: 80
                      }
                    ]
                  }
                },
                {
                  legend: ["GPU总资源", "GPU分配数", "GPU使用率"],
                  series: {
                    name: "资源配置",
                    data: [
                      {
                        name: "GPU总资源",
                        value: 3
                      },
                      {
                        name: "GPU分配数",
                        value: 1
                      },
                      {
                        name: "GPU使用率",
                        value: 100
                      }
                    ]
                  }
                },
                {
                  legend: ["内存总资源", "内存使用率"],
                  series: {
                    name: "资源配置",
                    data: [
                      {
                        name: "内存总资源",
                        value: 192
                      },
                      {
                        name: "内存使用率",
                        value: 52
                      }
                    ]
                  }
                },
              ];
            }
          }
        ]
      }),
      content: [],
      nodeContent: [{
        name: 'MASTE-1',
        internet: '192.68.1.10',
        system: 'Ubuntu16.04',
        standard: 'E5-2650v4 *2,P100 *2,MEN 256G',
        state: '在线',
        gpu: '是',
        update_time: new Date()
      }, {
        name: 'NODE-2',
        internet: '192.68.1.11',
        system: 'Ubuntu16.04',
        standard: 'E5-2650v4 *2,P100 *2,MEN 256G',
        state: '在线',
        gpu: '是',
        update_time: new Date()
      }, {
        name: 'NODE-3',
        internet: '192.68.1.12',
        system: 'Ubuntu16.04',
        standard: 'E5-2650v4 *2,P100 *2,MEN 256G',
        state: '在线',
        gpu: '是',
        update_time: new Date()
      }, {
        name: 'NODE-4',
        internet: '192.68.1.13',
        system: 'Ubuntu16.04',
        standard: 'E5-2650v4 *2,P100 *2,MEN 256G',
        state: '在线',
        gpu: '是',
        update_time: new Date()
      }],
      detail: {
        dialogVisible: false,
        data: {}
      },
      quatos: []
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  height: 100%;
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.progress-content {
  background: #fff;
  padding: 16px 16px 0;
  margin-top: 32px;
  margin-bottom: 32px;
  .filter-content {
    display: flex;
    width: 70%;
    .filter-item {
      flex: 1;
      display: flex;
      padding-right: 1rem;
      span {
        width: 4rem;
        line-height: 2.6rem;
      }
    }
  }
}

.chart_content {
  display: flex;
  .chart_item {
    flex: 1;
  }
}
</style>
