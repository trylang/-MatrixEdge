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
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Table from '@/components/Table.vue'
export default {
  name: 'DashboardAdmin',
  components: {
    Title,
    Table
  },
  data() {
    return {
      progressList: [{
        label: '节点在线率',
        percent: 90,
        color: '#5dbf99',
        value: `总数量(台)：${10}`
      }, {
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
      }, {
       label: '存储使用率',
        percent: 90,
        color: '#5dbf99',
        value: `总数量(个)：${20}`
      }],
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
      value8: '',
      param: {},
      header: [
        {
          label: "规则",
          type: "text",
          name: "id"
        },
        {
          label: "对象",
          type: "text",
          name: "name"
        },
        {
          label: "类别",
          type: "text",
          name: "desc"
        },
        {
          label: "级别",
          type: "text",
          name: "desc"
        },
        {
          label: "描述",
          type: "text",
          name: "desc"
        },
        {
          label: "告警时间",
          name: "update_time",
          type: "time",
          filter: "yyyy-MM-dd hh:mm:ss.S"
        },
        // {
        //   label: "操作",
        //   name: "operations",
        //   type: "buttons",
        //   style: {
        //     width: "130px"
        //   },
        //   operations: [
        //     {
        //       label: "编辑",
        //       name: "edit",
        //       type: "",
        //       style: {
        //         color: "#902323"
        //       },
        //       class: "edit",
        //       click: (item) => {
        //         Object.assign(this.dialog.param, item);
        //         this.dialog.dialogVisible = true;
        //       }
        //     },
        //     {
        //       label: "删除",
        //       name: "delete",
        //       type: "",
        //       style: {
        //         color: "#093216"
        //       },
        //       class: "delete",
        //       click: (item, data) => {
        //         this.deleteDialog(item, data);
        //       }
        //     }
        //   ]
        // }
      ],
      nodeHeader: [
        {
          label: "主机名",
          type: "text",
          name: "id"
        },
        {
          label: "网络信息",
          type: "text",
          name: "name"
        },
        {
          label: "操作系统",
          type: "text",
          name: "desc"
        },
        {
          label: "规格",
          type: "text",
          name: "desc"
        },
        {
          label: "状态",
          type: "text",
          name: "desc"
        },
        {
          label: "GPU",
          type: "text",
          name: "desc"
        },
        {
          label: "创建时间",
          name: "update_time",
          type: "time",
          filter: "yyyy-MM-dd hh:mm:ss.S"
        },
        // {
        //   label: "操作",
        //   name: "operations",
        //   type: "buttons",
        //   style: {
        //     width: "130px"
        //   },
        //   operations: [
        //     {
        //       label: "编辑",
        //       name: "edit",
        //       type: "",
        //       style: {
        //         color: "#902323"
        //       },
        //       class: "edit",
        //       click: (item) => {
        //         Object.assign(this.dialog.param, item);
        //         this.dialog.dialogVisible = true;
        //       }
        //     },
        //     {
        //       label: "删除",
        //       name: "delete",
        //       type: "",
        //       style: {
        //         color: "#093216"
        //       },
        //       class: "delete",
        //       click: (item, data) => {
        //         this.deleteDialog(item, data);
        //       }
        //     }
        //   ]
        // }
      ],
      content: [],
      nodeContent: [],
    }
  }
}
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
  background:#fff;padding:16px 16px 0;margin-top: 32px; margin-bottom:32px;
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
</style>
