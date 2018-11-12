<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
      <div class="progress-content">
				<span class="icon-down" @click="show = !show">
					<i class="el-icon-news"></i>
				</span>
				<transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
        	<Table class="table" v-if="show" :header="header" :content="content"></Table>        
				</transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import Table from "@/components/Table.vue";
import { header } from "./static.js";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Table
  },
  mixins: [ResizeMixin],
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
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
		},
		dropDown() {

		}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.progress-content {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  padding: 16px 16px 0;
  .table {
    background: #fff;
  }
}
.icon-down {
  position: fixed;
  top: 45rem;
  right: 3rem;
  font-size: 36px;
  color: #999;
  cursor: pointer;
}

</style>
