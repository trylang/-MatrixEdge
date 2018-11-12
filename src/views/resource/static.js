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

// 存储
export const storeHeader = [{
  label: "",
  name: "state",
  type: "checkbox"
}, {
  label: "名称",
  type: "text",
  name: "username"
}, {
  label: "容量",
  type: "text",
  name: "name"
}, {
  label: "创建时间",
  name: "created_at",
  type: "time", 
  filter: "yyyy-MM-dd hh:mm:ss.S"
}, {
  label: "状态",
  type: "text",
  name: "name"
}, {
  label: "项目空间",
  type: "text",
  name: "name"
}];

export const storeDialog = {
  models: [{
    label: '名称',
    name: 'username',
    type: 'text',
    required: true,
    placeholder: '请输入登录用户名'
  }, {
    label: '容量',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }],
  param: {
    id: "",
    username: "",
    phone: "",
    email: ""
  },
  rules: {
    username: [
      { required: true, message: '请输入账户名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
    ],
  }
};

// 配额规格
export const quotaHeader = [{
  label: "",
  name: "state",
  type: "checkbox"
}, {
  label: "名称",
  type: "text",
  name: "username"
}, {
  label: "CPU",
  type: "text",
  name: "name"
}, {
  label: "GPU",
  type: "text",
  name: "name"
}, {
  label: "内存",
  type: "text",
  name: "name"
}, {
  label: "存储",
  type: "text",
  name: "name"
}]; 

// 镜像
export const mirrorHeader = [{
  label: "",
  name: "state",
  type: "checkbox"
}, {
  label: "ID",
  type: "text",
  name: "username"
}, {
  label: "名称",
  type: "text",
  name: "username"
}, {
  label: "版本",
  type: "text",
  name: "name"
}, {
  label: "大小",
  type: "text",
  name: "name"
}, {
  label: "类型",
  type: "text",
  name: "name"
}, {
  label: "创建时间",
  type: "text",
  name: "name"
}]; 

export const quotaDialog = {
  models: [{
    label: '名称',
    name: 'username',
    type: 'text',
    required: true,
    placeholder: '请输入名称'
  }, {
    label: 'CPU',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }, {
    label: 'GPU',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }, {
    label: '内存',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }, {
    label: '存储',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }],
  param: {
    id: "",
    username: "",
    phone: "",
    email: ""
  },
  rules: {
    username: [
      { required: true, message: '请输入账户名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
    ],
  }
};

// 节点
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