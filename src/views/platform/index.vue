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
    <el-upload
      class="import-btn"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button type="primary">导入授权文件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
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
      fileList: [],
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
        授权: [
          {
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
          }
        ]
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
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


