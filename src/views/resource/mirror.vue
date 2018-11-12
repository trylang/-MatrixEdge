<template>
  <div class="dashboard-editor-container">
    <Title title="存储">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </Title>
    <el-row class="progress-content">
      <div class="filter-content">
        <div class="filter-item">
          <span>名称：</span>
          <el-input v-model="param.username" placeholder="请输入名称" clearable @clear="clearParam('username')" @change="getUserList"></el-input>
        </div>
      </div> 
      <div class="batch-content">
        <el-button type="primary" @click="batchDelete">删除</el-button>
      </div>
      <Table :header="mirrorHeader" :content="content"></Table>
    </el-row>

  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";
import { mirrorHeader } from "./static.js";
export default {
  name: "DashboardAdmin",
  components: {
    Title,
    Table
  },
  data() {
    return {
      fileList: [],
      param: {
        date: []
      },
      mirrorHeader: mirrorHeader,
      content: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    clearParam(name) {
      this.param[name] = null;
    },

    batchDelete() {
      let _this = this;
      let ids = this.content.filter(item => item.state).map(item => item.id);
      this.$api.deleteUser(ids).then(res => {
        _this.$msg("success", "删除成功!");
        _this.getUserList();
      });
    },
    getUserList() {
      let param = Object.assign({}, this.param);
      if (param.date && param.date.length > 0) {
        param.created_start = param.date[0];
        param.created_end = param.date[1];
      }
      delete param.date;
      this.$api.getUserList(param).then(res => {
        res.forEach(item => (item.state = false));
        this.content = res;
      });
    }
  },

  created() {
    this.getUserList();
  }
};
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

.more {
  line-height: 4rem;
  color: #0d9dff;
  &:hover {
    color: #72bcef;
  }
}
.el-input {
  width: 30%;
}
</style>
