<template>
  <div class="dashboard-editor-container">
    <Title title="训练管理">
      <el-button type="primary" @click="create">新增训练</el-button>
    </Title>
    <el-row class="progress-content">
      <div class="batch-content">
        <el-button type="primary" @click="batchDelete">删除</el-button>
      </div>
      <Table :header="header" :content="content"></Table>
    </el-row>
    <el-dialog
      :title="details.title"
      :visible.sync="detailVisible"
      width="70%">
      <Detail :details="details"></Detail>
    </el-dialog>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Table from "@/components/Table.vue";
import Detail from "@/components/Detail.vue";
import { header, details } from './static.js';

export default {
  name: "DashboardAdmin",
  components: {
    Title,
    Table,
    Detail
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
      value8: "",
      param: {},
      header: header.concat({
          label: "操作",
          name: "operations",
          type: "buttons",
          style: {
            width: "130px"
          },
          operations: [
            // {
            //   label: "编辑",
            //   name: "edit",
            //   type: "btn",
            //   btntype: "primary",
            //   click: item => {
            //     this.$router.push({path: '/practice/create', query: { id: item.id }});
            //   }
            // },
            {
              label: "删除",
              name: "delete",
              type: "btn",
              btntype: "danger",
              click: (item, data) => {
                this.deleteItem(item, data);
              }
            },
            {
              label: "更多",
              name: "dropdown",
              type: "dropdown",
              style: {
                color: "#093216"
              },
              class: "dropdown",
              options: [
                // {
                //   label: "继续",
                //   command: "continue"
                // },
                // {
                //   label: "暂停",
                //   command: "pause"
                // },
                // {
                //   label: "重新训练",
                //   command: "repeat"
                // },
                // {
                //   label: "提醒规则",
                //   command: "rules"
                // },
                // {
                //   label: "编辑器",
                //   command: "editor"
                // },
                {
                  label: "tensorboard",
                  command: "tensorboard"
                },
                {
                  label: "详情",
                  command: "detail"
                }
              ],
              handleCommand: command => {
                switch (command) {
                  case "detail":
                    this.detailVisible = true;
                    break;
                  case "tensorboard":
                    window.open('http://192.168.88.203:8181/user/hsh/tensorboard/1/#scalars', '_blank');
                    break;
                }
              }
            }
          ]
        }),
      content: [],
      details
    };
  },
  methods: {
    create() {
      this.$router.push({path: '/practice/create'});
    },
    deleteItem(item) {
      this.$api.deleteTfjobs([item.name]).then(res => {
        this.$msg("success", "删除成功!");
        this.getList();
      })
    },
    batchDelete () {
      let _this = this;
      let names = this.content.filter(item => item.state).map(item => item.name);
      this.$api.deleteTfjobs(names).then(res => {
        _this.$msg("success", "删除成功!");
        _this.getList();
      })
    },
    getList() {
      let _this = this;
      this.$api.tfjobList().then(res => {
        _this.content = res.items.map(item => {
          return {
            name: item.metadata.name,
            status: item.status.conditions ? item.status.conditions.map(status => {
              return status.type;
            }).join(',') : '',
            time: item.status.conditions ? item.status.conditions.map(status => {
              let dur = new Date(status.lastUpdateTime).valueOf() - new Date(item.metadata.creationTimestamp).valueOf();
              return dur;
            }).join(',') : '',
            create_time: item.metadata.creationTimestamp,
            state: false
          }
        });
      }) 
    },
  },
  created() {
    this.getList();
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
  .batch-content {
    margin-top: 1.5rem;
  }
}
</style>
