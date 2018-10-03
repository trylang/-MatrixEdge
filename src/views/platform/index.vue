<template>
  <div>
    <div class="info" v-for="(info, title) in details" :keys="title">
      <Title :title="title"></Title>
      <div class="info-content" v-for="(item, index) in info" :keys="index">
        <div class="info-item" >
          <span>{{item.label}}</span>
          <strong>{{item.value}}</strong>
        </div>
      </div>
    </div>
     <el-button class="import-btn" type="primary">导入授权文件</el-button>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  components: {
    Title
  },
  data() {
    return {
      details: {
        版本: [
          {
            label: "版本名称：",
            value: "MatrixEdge™标准版"
          },
          {
            label: "版本号：",
            value: "V00.10.00"
          },
          {
            label: "软件厂商：",
            value: "聚时科技（上海）有限公司"
          },
          {
            label: "联系方式：",
            value: "0000-00000000"
          }
        ],
        授权: [{
            label: "激活状态：",
            value: "已激活/未激活"
          },
          {
            label: "被授权单位：",
            value: "北京理工大学"
          },
          {
            label: "授权时间：",
            value: "2018-09-03——9999-99-99"
          },]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.info {
  margin-top: 3rem;
  padding: 0 2.5rem;
  
  .info-content {
    display: flex;
    margin-top: 1rem;
    margin-left: 15rem;
    .info-item {
      span {
        color: #666;
        text-align: right;
        margin-right: 2rem;
        width: 12rem;
        display: inline-block;
      }
      strong {
        color: #505050;
      }
    }
  }
}
.import-btn {
  margin: 2rem 27rem;
}

</style>


