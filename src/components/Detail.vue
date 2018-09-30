<template>
  <div class="detail-container">
    <el-row v-for="(detail, title) in details.info" :key="title">
      <Title :title="title"></Title>

      <div class="item-content" :style="{width: (((item.colLeft || 6) + (item.colRight || 18)) * 4.16) + '%' }" v-for="(item, index) in detail" :key="index">
        <el-col class="item-wrap" :span="item.colLeft || 6">
          <span lass="label">{{item.label}}:</span>
        </el-col>
        <el-col class="item-wrap" :span="item.colRight || 18">
          <span class="value">{{item.value}}</span>
        </el-col>
      </div>   
    </el-row>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";

export default {
  name: 'detail',
  components: {
    Title
  },
  props: {
    details: {
      type: Object
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-container {
  padding: 0 1rem;
  margin-top: -1rem;
  .item-content {
    height: 3rem;
    line-height: 3rem;
    display: inline-block;
    .item-wrap {
      flex: 1;
      .value {
        font-weight: 500;
      }
    }
  }
}



</style>

