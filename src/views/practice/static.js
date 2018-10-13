export const header = [{
  label: "",
  name: "state",
  type: "checkbox"
}, {
  label: "名称",
  type: "text",
  name: "name"
},
{
  label: "accuracy",
  type: "text",
  name: "accuracy"
},
{
  label: "状态",
  type: "text",
  name: "status"
},
{
  label: "配置（总计）",
  type: "text",
  name: "quate"
},
{
  label: "运行时间（小时）",
  type: "text",
  name: "time"
},
{
  label: "创建时间",
  name: "create_time",
  type: "time",
  filter: "yyyy-MM-dd"
}];

export const dialog = {
  models: [{
    label: '账号',
    name: 'username',
    type: 'text',
    required: true,
    placeholder: '请输入登录用户名'
  }, {
    label: '初始密码',
    name: 'password',
    type: 'text',
    required: true,
    placeholder: '密码长度为6-16位，仅限字母、数字、横线、下划线'
  }, {
    label: '姓名',
    name: 'name',
    type: 'text',
    placeholder: '请填写真实姓名'
  }, {
    label: '邮箱',
    name: 'email',
    type: 'text',
    required: true,
    placeholder: '请输入常用邮箱'
  }, {
    label: '手机号',
    name: 'phone',
    type: 'number',
    placeholder: '可填固定电话或手机号'
  }, {
    label: '单位（部门）',
    name: 'department',
    type: 'text',
    placeholder: '请填写单位（部门）全称'
  },  {
    label: '',
    type: 'title',
    title: '配额'
  }, {
    label: 'GPU（个）',
    name: 'gpu',
    type: 'slider',
    min: 0,
    max: 100
  }, {
    label: 'CPU（个）',
    name: 'cpu',
    type: 'slider',
    min: 0,
    max: 4
  }, {
    label: '内存（GB）',
    name: 'memory',
    type: 'slider',
    min: 0,
    max: 90
  }, {
    label: '存储空间（GB）',
    name: 'storage',
    type: 'slider',
    min: 0,
    max: 300
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
      { min: 3, max: 50, message: '请输入正确的邮箱', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
      { min: 0, max: 99999999999, message: '请输入正确的电话号吗', trigger: 'blur' }
    ],
  }
};

export const details = {
  title: "训练任务详情",
  info: {
    基础信息: [
      {
        label: "训练名称",
        value: "mnist"
      },
      {
        label: "部署模式",
        value: "集群"
      },
      {
        label: "部署机位",
        value: "node1 （192.168.1.1） node2 （192.168.1.21）"
      },
      {
        label: "角色",
        value: "PS,Work1 Work2"
      },
      {
        label: "计算资源",
        value: "CPU 3 GPU0 Men：10G CPU 3 GPU1 Men：10G"
      }
    ],
    训练属性: [
      {
        label: "算法模型",
        value: "/wang/gan-11/gan-11.py"
      },
      {
        label: "结果存放路径",
        value: "/wang/gan-11/"
      }
    ],
    训练信息: [
      {
        colLeft: 6,
        colRight: 6,
        label: "accuracy",
        value: "GAN-11"
      },
      {
        colLeft: 6,
        colRight: 6,
        label: "Data Training",
        value: "单机/30000集群"
      },
      {
        colLeft: 6,
        colRight: 6,
        label: "loss",
        value: "0.5121"
      },
      {
        colLeft: 6,
        colRight: 6,
        label: "Valodation",
        value: "10000"
      },
      {
        colLeft: 6,
        colRight: 6,
        label: "Batch size",
        value: "16"
      }
    ],
    超级参数: [
      {
        label: "weights",
        value: "/wang/gan-11/gan-11.py"
      },
      {
        label: "learning_rate",
        value: "/wang/gan-11/"
      }
    ]
  }
};
