<template>
  <div class="dashboard-editor-container">
    <Title title="实验室信息">
      <div>
        <el-button type="primary" @click="goToHandler">进入实验室</el-button>
        <el-button type="primary" @click="dialogVisible=true;">重置实验室</el-button>
      </div>
    </Title>
    <el-row class="progress-content">
      <Table :header="header" :content="content" :noPage="true"></Table>
    </el-row>

    <el-dialog
      title="重置实验室"
      :visible.sync="dialogVisible"
      width="30%">
      
      <el-switch
        style="display: block"
        v-model="saveData"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="保留数据"
        inactive-text="不保留数据">
      </el-switch>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandler">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";

export default {
  components: {
    Title,
    Table,
  },
  data() {
    return {
      dialogVisible: false,
      saveData: true,
      header: [{
        label: "工具",
        type: "text",
        name: "tool"
      }, {
        label: "配置",
        type: "text",
        name: "configure"
      }, {
        label: "创建时间",
        type: "time",
        filter: "yyyy-MM-dd hh:mm:ss.S",
        name: "date"
      }]
    };
  },
  computed: {
    content() {
      let arr = [];
      let query = this.$route.query;
      if (query) {       
        arr.push({
          tool: query.engine,
          configure: `GPU:${query.gpu} CPU:${query.cpu} 内存：${query.memory}`,
          date: query.create_at,
          status: query.status,
          lab_url: query.lab_url,
        })
      }
      return arr;
    }
  },
  methods: {
    goToHandler() {
      if (this.content.length > 0 && this.content[0].status === 'Running') {
        window.open(this.content[0].lab_url, "_blank");
      } else {
        this.$msg('warning', '目前无法跳转');
      }
    },
    confirmHandler() {
      this.$msg("success", "重置成功");
      this.dialogVisible = false;
      this.$router.push({ path: "/AI/index" }); 
    }
  }
};
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
        white-space: nowrap;
        line-height: 2.6rem;
      }
    }
  }
  .batch-content {
    margin-top: 1.5rem;
  }
}

</style>
