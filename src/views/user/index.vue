<template>
  <div class="dashboard-editor-container">
    <Title title="用户日志">
      <router-link class="more" to="/user/log">更多</router-link>
    </Title>
    <el-row class="progress-content">
      <Table :header="logHeader" :content="logContent"></Table>
    </el-row>

    <Title title="用户信息">
      <el-button type="primary" @click="dialog.dialogVisible = true, dialog.param={id: '', username: '', phone: '', email: '', password: ''}">新增用户</el-button>
    </Title>
    <el-row class="progress-content">
      <div class="filter-content">
        <div class="filter-item">
          <span>账号：</span>
          <el-input v-model="param.username" placeholder="请输入账号" clearable @clear="clearParam('username')" @change="getUserList"></el-input>
        </div>
        <div class="filter-item">
          <span>手机号：</span>
          <el-input v-model="param.phone" placeholder="请输入电话号码" clearable @clear="clearParam('phone')" @change="getUserList"></el-input>
        </div>
        <div class="filter-item">
          <span>创建时间：</span>
          <el-date-picker
            @change="getUserList"
            v-model="param.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div> 
      <div class="batch-content">
        <el-button type="primary" @click="batchDelete">删除</el-button>
      </div>
      <Table :header="userHeader" :content="userContent"></Table>
    </el-row>

    <Dialog :title="dialog.param.id? '修改用户': '新增用户'" :dialog="dialog"></Dialog>
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
import { logHeader, userHeader, userDialog } from './static.js';
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      param: {
        date: []
      },
      logHeader,
      logContent: [],
      userHeader: userHeader.concat({
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
      userContent: [],
      dialog: {
        models: userDialog.models,
        dialogVisible: false,
        param: userDialog.param,
        rules: userDialog.rules,
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
      let ids = this.userContent.filter(item => item.state).map(item => item.id);
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
        this.userContent = res;
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
</style>
