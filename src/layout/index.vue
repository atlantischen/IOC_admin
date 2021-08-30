<template>
  <div :class="classObj" class="app-wrapper">
    <div class="header">
      <span >奇信物联网平台开发者平台</span>
      <div class="outer_box">
        <el-badge is-dot class="item" style="margin-right:20px">
            <svg-icon style="font-size:24px" icon-class="tishi" />
          <!-- <el-button class="share-button" icon="el-icon-share" type="primary"></el-button> -->
        </el-badge>
         <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click" >
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            />
            <span class="userName">{{name}}</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="infoClick('info')">
              <svg-icon icon-class="user" style="margin-right:15px;" />
              <span style="display:block;">我的信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided  @click.native="infoClick('password')">
              <svg-icon icon-class="password" style="margin-right:15px;" />
              <span style="display:block">修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         </div>
         <span style="font-size:14px;cursor: pointer;"  @click="logout">退 出</span>
      </div>
     
    </div>
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
  
    </div>
    <UserInfo :dialogVisible.sync="dialogVisible"></UserInfo>
    <RestPassword :passwordDialogVisible.sync="passwordDialogVisible">></RestPassword>
  </div> 
</template>

<script>
import { mapGetters } from "vuex";

import { Navbar, Sidebar, AppMain } from "./components";
import  UserInfo from "./components/UserInfo.vue";
import  RestPassword from "./components/resetPassword.vue";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  data() {
    return {
      dialogVisible:false,
      passwordDialogVisible:false
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    UserInfo,
    RestPassword
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    },
    ...mapGetters(["sidebar", "avatar","name"])
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 我的信息
    infoClick(v){
      switch (v) {
        case 'info':
          this.dialogVisible=true

          break;
        case 'password':
          this.passwordDialogVisible=true

          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
  .el-badge__content.is-fixed.is-dot{
    right: 10px;
    top: 5px;
    height: 10px;
    width: 10px;
  }
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

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
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  background: linear-gradient(0deg, #3455b4, #1da6df);
  box-shadow: 0px 0px 16px 0px rgba(127, 151, 183, 0.48);
  color: #fff;
  padding: 0 30px 0 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .outer_box{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .right-menu {
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      height: 100%;
      .avatar-wrapper {
         height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .userName{
          color: #fff;
          padding-left: 15px;
          font-size: 14px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
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

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
