<template>
  <div class="dashboard-editor-container">
    <Title :title="title"></Title>
    <el-form class="form_content" ref="ruleForm" label-width="140px" v-for="(role, index) in roles" :key="index">
      <template v-if="!role.addRole">
        <el-form-item label="训练名称：">
          <el-input type="text" v-model="role.name" auto-complete="off" placeholder="请输入训练名称"></el-input>
        </el-form-item>

        <el-form-item label=""> 
          <el-radio-group v-model="role.radio" @change="chackRadio">
            <el-radio :label="1">单机</el-radio>
            <el-radio :label="2">分布式</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <el-form-item label="角色：">
        <el-select v-model="role.role" :disabled="(!role.addRole)&&(role.radio==1)" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="容器镜像：">
        <el-select v-model="role.image" placeholder="请选择">
          <el-option
            v-for="item in images"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="运行命令：">
        <el-input type="text" v-model="role.command" auto-complete="off" placeholder="请输入运行命令【以英文逗号分割】"></el-input>
      </el-form-item>

      <el-form-item label="运行命令参数：">
        <el-input type="text" v-model="role.args" auto-complete="off" placeholder="请输入运行命令参数【以英文逗号分割】"></el-input>
      </el-form-item>

      <el-form-item label="副本数">
        <el-input-number v-if="role.role==='Chief'" v-model="role.replicas" :min="0" :max="1" label="副本数"></el-input-number>      
        <el-input-number v-else v-model="role.replicas" :min="0" :max="9999999999" label="副本数"></el-input-number>      
      </el-form-item>

      <el-form-item label="初始化参数：">
        <span style="cursor: pointer;" @click="addInit(index)"><i class="el-icon-circle-plus"></i>  添加初始化参数</span>
        <div class="init_param" v-for="(item, index) in role.env" :key="index">
          <el-input class="param_item" type="text" v-model="item.name" auto-complete="off" placeholder="name"></el-input>
          <el-input class="param_item" type="text" v-model="item.value" auto-complete="off" placeholder="value"></el-input>
          <i class="el-icon-delete param_item param_item_icon" @click="deleteInitParam(index, item)"></i>
        </div>
      </el-form-item>

      <el-form-item label="卷：">
        <span style="cursor: pointer;" @click="addVolumes(index)"><i class="el-icon-circle-plus"></i>  添加卷</span>
        <div class="init_param init_volumes" v-for="(item, index) in role.volumes" :key="index">
          <div class="volume_item">
            <el-select class="param_item" v-model="item.volume" placeholder="请选择"> <el-option v-for="option in [{label: 'Azure File', value: 'azureFile'}, {label: 'Host Path', value: 'hostPath'}]" :key="option.value" :label="option.label" :value="option.value"> </el-option> </el-select>
            <el-input class="param_item" type="text" v-model="item.name" auto-complete="off" placeholder="name"></el-input>
          </div>
          
          <div class="volume_item">
            <el-input class="param_item" type="text" v-model="item.mountPath" auto-complete="off" placeholder="Mount Path"></el-input>
            <el-input class="param_item" type="text" v-model="item.subPath" auto-complete="off" placeholder="Sub Path"></el-input>
          </div>

          <div v-show="item.volume == 'hostPath'"  class="volume_item">
            <el-input class="param_item" type="text" v-model="item.hostPath" auto-complete="off" placeholder="Host Path"></el-input>
          </div>
          
          <div v-show="item.volume == 'azureFile'" class="volume_item">
            <el-input class="param_item" type="text" v-model="item.secretName" auto-complete="off" placeholder="Secret Name"></el-input>
            <el-input class="param_item" type="text" v-model="item.shareName" auto-complete="off" placeholder="Share Name"></el-input>
          </div>
          
          <i class="el-icon-delete param_item param_item_icon" @click="deleteInitVolume(index, item)"></i>
        </div>
      </el-form-item>

      <!-- <el-form-item label="结果存放路径：">
        <label for="fileinp">
          <input type="button" class="filebtn" value="浏览"><span class="text">路径</span>
          <input type="file" class="fileinp">
        </label>
      </el-form-item> -->

      <el-form-item  label="GPU(个)：">
        <el-slider :min="0" :max="15"  v-model="role.gpu"></el-slider>
      </el-form-item>

      <!-- <el-form-item label="CPU(个)：">
        <el-slider :min="0" :max="15"  v-model="role.cpu"></el-slider>
      </el-form-item>

      <el-form-item label="内存(GB)：">
        <el-slider :min="0" :max="30"  v-model="role.gb"></el-slider>
      </el-form-item> -->

    </el-form>
    
    <div class="footer">
      <el-button class="addRole" :disabled="ifAdd==1" type="text" icon="el-icon-circle-plus" @click="addRoleHandler">添加角色</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
    </div>

  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Role from "./components/Role.vue";
export default {
  components: {
    Title,
    Role
  },
  data() {
    return {
      ruleForm: {
        radio: 1
      },
      ifAdd: 1,
      roles: [{
        radio: 1,
        role: 'Chief',
        replicas: 0,
        env: [{
          name: '',
          value: ''
        }],
        volumes: []
      }],
      addRole: false,
      images: [{
        label: 'Tensorflow 1.4.1 CPU',
        value: 'gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-cpu:v0.2.1'
      }],
      options: [
        {
          label: "Chief",
          value: "Chief"
        },
        {
          label: "Worker",
          value: "Worker"
        },
        {
          label: "PS",
          value: "PS"
        },
        {
          label: "Eval",
          value: "Eval"
        }
      ],
    };
  },
  computed: {
    title() {
      return this.$route.query.id ? "修改训练" : "创建训练";
    }
  },
  methods: {
    chackRadio(value) {
      this.ifAdd = value;
    },
    formatParam(data) {
      let param = {
        metadata: {
          name: '',
          namespace: 'default',
        },
        spec: {
          tfReplicaSpecs: {}
        }
      }
      
      let specs = param.spec.tfReplicaSpecs;
      data.forEach(item => {
        if (item.name) {
          param.metadata.name = item.name
        }
        specs[item.role] = {
          replicas: item.replicas,
          template: {
            spec: {
              restartPolicy: "OnFailure",
              volumes: item.volumes.map(volume => {
                if (volume.volume === 'azureFile') {
                  return {
                    name: volume.name,
                    subPath: volume.subPath,
                    azureFile: {
                      secretName: volume.secretName,
                      shareName: volume.shareName
                    }
                  }
                } else if (volume.volume === 'hostPath') {
                  return {
                    name: volume.name,
                    subPath: volume.subPath,
                    hostPath: {
                      path: volume.hostPath
                    }
                  }
                }
                
              }),
              containers: [{
                image: item.image,
                name: 'tensorflow',
                command: [item.command],
                args: [item.args],
                env: item.env,
                resources: {
                  limits: {
                    "nvidia.com/gpu": item.gpu
                  },
                  requests: {
                    "nvidia.com/gpu": item.gpu
                  }
                },
                volumeMounts: item.volumes.map(volume => {
                  return {
                    name: volume.name,
                    mountPath: volume.mountPath
                  }
                })
              }]
            }
          }
        };
      })
      // console.log(JSON.stringify(param));
      return param;
    },
    submitForm(formName) {
      let param = this.formatParam(this.roles);
      this.$api.addTfjobs(param).then(res => {
        this.$router.push({path: '/practice/index'});
      });
    },
    addRoleHandler() {
      this.roles.push({
        addRole: true,
        replicas: 0,
        env: [{
          name: '',
          value: ''
        }],
        volumes: [],
      })
    },
    addInit(index) {
      this.roles[index].env.unshift({name: '', value: ''});
    },
    addVolumes(index) {
      this.roles[index].volumes.unshift({volume: 'hostPath', name: '', mountPath: '', subPath: '', hostPath: '', secretName: '', shareName: ''});
    },
    deleteInitParam(index, item) {
      this.roles[index].env.splice(index, 1);
    },
    deleteInitVolume(index, item) {
      this.roles[index].volumes.splice(index, 1);
    },
    fetchDate() {}
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchDate"
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  // background-color: rgb(240, 242, 245);
}
.form_content {
  width: 32rem;
  margin: 3rem auto;
}
.form_content {
  width: 32rem;
  margin: 2rem auto;
  label {
    position: relative;
  }
  .fileinp {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .filebtn {
    padding: 5px 10px;
    background: #0d9dff;
    color: #FFF;
    border: none;
    border-radius: 5px;
  }
  .text {
    padding-left: 1rem;
    color: #666;
  }
  .init_param, .init_volumes {
    display: flex;
    padding-bottom: .5rem;
    .param_item {
      padding-right: 1rem;
    }
    .param_item_icon {
      line-height: 2rem;
    }
  }

  .init_volumes {
    flex-direction: column;
    .volume_item {
      display: flex;
      margin-top: 1rem;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .addRole {
    margin-left: -22rem;
  }
}
</style>