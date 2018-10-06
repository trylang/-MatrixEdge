export const logHeader = [{
  label: "账号",
  type: "text",
  name: "id"
},
{
  label: "登录IP",
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
  name: "desc"
},
{
  label: "时间",
  name: "update_time",
  type: "time",
  filter: "yyyy-MM-dd hh:mm:ss.S"
}];

export const userHeader = [{
  label: "",
  name: "state",
  type: "checkbox"
},{
  label: "账号",
  type: "text",
  name: "username"
},{
  label: "姓名",
  type: "text",
  name: "name"
},{
  label: "手机号",
  type: "text",
  name: "phone"
},{
  label: "邮箱",
  type: "text",
  name: "email"
},{
  label: "单位（部门）",
  type: "text",
  name: "department"
},{
  label: "资源配置/使用率",
  type: "text",
  name: "name"
},{
  label: "创建时间",
  type: "text",
  name: "name"
},];

export const userDialog = {
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