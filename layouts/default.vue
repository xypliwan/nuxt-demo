<template>
  <div>
    <div class="navs">
      <nav-bar></nav-bar>
    </div>
    <div class="midden">
        <nuxt/>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import NavBar from "~/components/nav/nav.vue";
import MyFooter from "~/components/footer/index.vue";
export default {
  components: {
    NavBar,
    MyFooter
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/styles/global.scss";
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  /* font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased; */
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.navs {
  width: 100%;
  background: $bg;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.midden {
  width: 100%;
  margin-top: 60px;
  min-height: 780px;
}
</style>
<style>
.el-select-dropdown__item{
    font-size: 14px!important;
    padding: 0 20px!important;
    line-height: 34px!important;
    -webkit-box-sizing: border-box!important;
}
</style>

