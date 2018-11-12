<template>
  <div class="dashboard-editor-container">
    <Title title="配额模版">
      <el-button type="primary" @click="dialog.dialogVisible = true, dialog.param={id: '', username: '', phone: '', email: '', password: ''}">创建</el-button>
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
      <Table :header="quotaHeader" :content="content"></Table>
    </el-row>

    <Dialog :title="dialog.param.id? '修改': '创建'" :dialog="dialog"></Dialog>
    <el-dialog
      title="新建"
      :visible.sync="detailVisible"
      width="70%">
    </el-dialog>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";
import Dialog from "@/components/Dialog.vue";
import { quotaHeader, quotaDialog } from './static.js';
export default {
  name: "DashboardAdmin",
  components: {
    Title,
    Table,
    Dialog
  },
  data() {
    return {
      detailVisible: false,
      param: {
        date: []
      },
      quotaHeader: quotaHeader.concat({
          label: "操作",
          name: "operations",
          type: "buttons",
          style: {
            width: "130px"
          },
          operations: [
            {
              label: "编辑",
              name: "edit",
              type: "btn",
              btntype: "primary",
              click: item => {
                if (item.quotas.length > 0) {
                  let quotas = item.quotas[0];
                  item.cpu = Number(quotas.cpu);
                  item.gpu = Number(quotas.gpu);
                  item.memory = Number(quotas.memory);
                  item.storage = Number(quotas.storage);
                }
                item.phone = String(item.phone);
                Object.assign(this.dialog.param, item);
                this.dialog.dialogVisible = true;
              }
            }
          ]
        }),
      content: [],
      dialog: {
        models: quotaDialog.models,
        dialogVisible: false,
        param: quotaDialog.param,
        rules: quotaDialog.rules,
        options: [{
          label: "确 定",
          name: "submit",
          type: "primary",
          disabledFun: () => {
            let _this = this;
            return Object.values(this.dialog.models).some(item => {
              return item.required && (_this.dialog.param[item.name] === (undefined || ""));
            });
          },
          click: (formName) => {
            this.confirmDialog();
          }
        }, {
          label: "取 消",
          name: "reset",
          type: "",
          click: () => {
            this.cancelDialog();
          }
        }]
      },
    };
  },
  methods: {
    clearParam(name) {
      this.param[name] = null;
    },
    confirmDialog () {
      let _this = this;
      let param = Object.assign({}, this.dialog.param);
      param.quota = {cpu: param.cpu, memory: param.memory, gpu: param.gpu, storage: param.storage}
      if (this.dialog.param.id) {
        // 修改
        this.dialog.dialogVisible = false;        
        this.$api.updateUser(param).then(res => {
          _this.$msg("success", "修改成功!");
          _this.getUserList();
        })
          .catch(error => {
            _this.$msg("error", !error.msg? error.msg :'无法修改，请重试');
          });
      } else {
        // 新增
        this.$api.createUser(param).then(res => {
          _this.$msg("success", "创建成功!");
          this.dialog.dialogVisible = false;
          _this.getUserList();
        })
          .catch(error => {
            _this.$msg("error", !error.msg? "无法创建，请重试!" : error.msg);
          });
      }
    },
    cancelDialog () {
      this.dialog.dialogVisible = false;
    },
    batchDelete () {
      let _this = this;
      let ids = this.content.filter(item => item.state).map(item => item.id);
      this.$api.deleteUser(ids).then(res => {
        _this.$msg("success", "删除成功!");
        _this.getUserList();
      })
    },
    getUserList() {
      let param = Object.assign({}, this.param);
      if (param.date && param.date.length > 0) {
        param.created_start = param.date[0];
        param.created_end = param.date[1];
      }  
      delete param.date;    
      this.$api.getUserList(param).then(res => {
        res.forEach(item => item.state = false);
        this.content = res;
      })
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

