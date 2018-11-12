<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
      <!-- <div class="progress-content">
				<span class="icon-down" @click="show = !show">
					<i class="el-icon-news"></i>
				</span>
				<transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
        	<div class="table"><Table v-if="show" :header="header" :content="content"></Table></div>          
				</transition>
      </div> -->
    </transition>
  </section>
</template>

<script>
import { header } from "../static.js";
import Table from "@/components/Table.vue";

export default {
  name: 'AppMain',
  components: {
    Table
  },
  data() {
    return {
			show: false,
      header,
      content: [
        {
          name: "张三",
          ip: "10.10.172.32",
          option: "登录",
          state: "成功",
          time: "2018.10.22 09: 28: 03"
        },
        {
          name: "李四",
          ip: "10.10.199.32",
          option: "提出",
          state: "成功",
          time: "2018.11.02 22: 28: 03"
        },
        {
          name: "王玉",
          ip: "10.10.173.90",
          option: "创建项目空间",
          state: "创建中",
          time: "2018.11.12 09: 28: 03"
        },
        {
          name: "哈哈",
          ip: "10.10.182.32",
          option: "登录",
          state: "失败",
          time: "2018.11.11 12: 28: 03"
        }
      ]
    };
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
.progress-content {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  padding: 16px 16px 0;
  margin-bottom: 32px;
  .table {
    background: #fff;
  }
}
.icon-down {
  float: right;
  font-size: 36px;
  color: #999;
  cursor: pointer;
}
</style>
