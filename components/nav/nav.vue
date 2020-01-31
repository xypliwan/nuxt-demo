<template>
  <div class="nav">
    <div class="logo fl">
      <img src="~/assets/images/logo.png" alt="" />
    </div>
    <div class="nav-list">
      <ul>
        <nuxt-link to="/home" tag="li">首页</nuxt-link>
        <nuxt-link to="/sea-bulk" tag="li">海运整柜</nuxt-link>
        <nuxt-link to="/sea-full" tag="li">海运散柜</nuxt-link>
        <nuxt-link to="/air-transport" tag="li">空运服务</nuxt-link>
        <nuxt-link to="/contact-us" tag="li">联系我们</nuxt-link>
      </ul>
    </div>
    <div class="login-box fr" v-show="!hasLogin">
      <nuxt-link to="/login/login" tag="div" class="login-item">
        登录
      </nuxt-link>
      <nuxt-link to="/login/regist" tag="div" class="login-item">
        注册
      </nuxt-link>
    </div>
    <div class="login-box fr" v-show="hasLogin">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- {{ userinfo.username }} -->
          xxxx
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">海鸥派平台</el-dropdown-item>
          <el-dropdown-item command="1">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { setLocalStorage, getLocalStorage } from "~/utils/localStorage";
export default {
  data() {
    return {
      hasLogin: false
    };
  },
  created() {
    // setLocalStorage("rt","2343123")
    // console.log(getLocalStorage("rt"))
  },
  watch: {
        isLogin(newVal){
            this.hasLogin = newVal
        }
    },
};
</script>




<style lang="scss" scoped>
@import "~assets/styles/global.scss";
.nav {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  .logo {
    height: 60px;
    line-height: 80px;
    text-align: left;
    .img {
      width: 123px;
      height: 32px;
    }
  }
  .nav-list {
    flex: 1;
    height: 100%;
    padding: 0 30px;
    ul {
      li {
        float: left;
        padding: 0 20px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 15px;
        color: #d2d2d2;
        cursor: pointer;
        @include transitons(0.2s);
        &:hover {
          background: rgba(6, 167, 125, 0.4);
        }
        &.exact-active-link {
          background: rgba(6, 167, 125, 0.4);
          color: #fff;
        }
      }
    }
  }
  .login-box {
    width: 200px;
    height: 60px;
    color: #fff;
    .login-item {
      height: 100%;
      text-align: center;
      line-height: 60px;
      font-size: 13px;
      float: left;
      width: 50px;
      @include transitons(0.2s);
      &:hover {
        background: rgba(6, 167, 125, 0.4);
      }
      cursor: pointer;
      img {
        height: 25px;
        width: 25px;
        vertical-align: middle;
        position: relative;
        top: -2px;
        margin-right: 2px;
      }
    }
    .login-item-user {
      width: 100px;
      text-align: center;
      img {
        width: 18px;
        vertical-align: middle;
        height: 18px;
      }
    }
  }
}
</style>

<style>
.el-dropdown {
  display: block;
  width: 100px;
  height: 60px;
  line-height: 60px;
}
.el-dropdown span {
  height: 60px;
  display: block;
  line-height: 60px;
  color: #fff;
  text-align: center;
}
.el-dropdown-menu__item {
  line-height: 36px !important;
  padding: 0 20px !important;
  font-size: 14px !important;
}
</style>


