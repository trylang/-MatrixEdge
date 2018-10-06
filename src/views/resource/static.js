export const alertHeader = [
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
];
export const nodeHeader = [
  {
    label: "主机名",
    type: "text",
    name: "name"
  },
  {
    label: "网络信息",
    type: "text",
    name: "internet"
  },
  {
    label: "操作系统",
    type: "text",
    name: "system"
  },
  {
    label: "规格",
    type: "text",
    name: "standard"
  },
  {
    label: "状态",
    type: "text",
    name: "state"
  },
  {
    label: "GPU",
    type: "text",
    name: "gpu"
  },
  {
    label: "创建时间",
    name: "update_time",
    type: "time",
    filter: "yyyy-MM-dd hh:mm:ss.S"
  }
];