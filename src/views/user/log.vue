<template>
  <div class="dashboard-editor-container">
    <Title title="用户日志"></Title>
    <el-row class="progress-content">
      <div class="filter-content">
        <div class="filter-item">
          <span>账号：</span>
          <el-input v-model="param.name" placeholder="请输入账号"></el-input>
        </div>
      </div> 
      <Table :header="header" :content="content"></Table>
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
      value8: '',
      param: {},
      header: [
        {
          label: "账号",
          type: "text",
          name: "id"
        },
        {
          label: "连接IP",
          type: "text",
          name: "name"
        },
        {
          label: "操作",
          type: "text",
          name: "desc"
        },
        {
          label: "结果",
          type: "text",
          name: "jieguo"
        },
        {
          label: "时间",
          name: "update_time",
          type: "time",
          filter: "yyyy-MM-dd hh:mm:ss.S"
        },
      ],
      content: [{
        id: 'wang',
        name: '192.168.88.121',
        desc: '登录平台',
        jieguo: '成功',
        update_time: '2018-10-08 14:03:58'
      }],
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  height: 100%;
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
    width: 30%;
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
