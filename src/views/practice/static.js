export const header = [{
  label: "名称",
  type: "text",
  name: "id"
},
{
  label: "用户",
  type: "text",
  name: "name"
},
{
  label: "accuracy",
  type: "text",
  name: "desc"
},
{
  label: "状态",
  type: "text",
  name: "desc"
},
{
  label: "配置（总计）",
  type: "text",
  name: "desc"
},
{
  label: "运行时间（小时）",
  type: "text",
  name: "desc"
},
{
  label: "创建时间",
  name: "update_time",
  type: "time",
  filter: "yyyy-MM-dd hh:mm:ss.S"
}];


export const details = {
  title: "训练任务详情",
  info: {
    基础信息: [
      {
        label: "训练名称",
        value: "GAN-11"
      },
      {
        label: "部署模式",
        value: "单机/集群"
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
