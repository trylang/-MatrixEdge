<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>

    <div class="avatar-container">
      <router-link class="link" to="/alert/index"><i class="el-icon-bell"></i></router-link>
      <router-link class="link" to="/log/index"><i class="el-icon-question"></i></router-link>
         
      <el-dropdown trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <img class="user-avatar" :src="userImg">
          <span style="color: #eee; font-size: 16px; margin-left: .5rem;vertical-align:top;">admin</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/user/editUser">
            <el-dropdown-item>
              修改账户
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/user/editPsd">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import userImg from '@/assets/user.jpg'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      let _this = this;
      this.$store.dispatch('LogOut').then(() => {
        _this.$router.push('/login');
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: rgb(48, 65, 86);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .link {
    display: table-cell;
    vertical-align: top;
    color: #fff;
    font-size: 20px;
    width: 50px;
  }
  .el-dropdown {
    display: table-cell;
  }
}
</style>

