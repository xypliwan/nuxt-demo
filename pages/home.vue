<template>
  <div class="home">
    <my-baner></my-baner>
    <div class="content">
      <hai-ou-do></hai-ou-do>
      <logistics-product></logistics-product>
      <advisory v-loading="newsLoading" :newsOne="newsOne" :middleTwo="middleTwo" :rightThree="rightThree" :leftNews="leftNews" :middleNews="middleNews" :rightNews="rightNews"></advisory>
    </div>
  </div>
</template>

<script>
import MyBaner from "~/components/home/Baner";
import HaiOuDo from "~/components/home/HaiOuDo";
import LogisticsProduct from "~/components/home/LogisticsProduct";
import Advisory from "~/components/home/Advisory";
import { getBottomNews } from "@/api"
export default {
    data() {
        return {
            newsLoading:false
        }
    },
  async asyncData(ctx) {
    //   this.newsLoading = false
        let datas = await getBottomNews()
        // this.newsOne = datas[0];
        // this.middleTwo = datas[1];
        // this.rightThree = datas[2];
        // this.newsList.leftNews = datas.slice(3,6);
        // this.newsList.middleNews = datas.slice(6,9);
        // this.newsList.rightNews = datas.slice(9,12);
        return {
            newsOne:datas[0],
            middleTwo:datas[1],
            rightThree:datas[2],
            leftNews:datas.slice(3,6),
            middleNews:datas.slice(6,9),
            rightNews:datas.slice(9,12)
        }
        // console.log(datas)

  },
  components: {
    MyBaner,
    HaiOuDo,
    LogisticsProduct,
    Advisory
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.content {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
</style>
