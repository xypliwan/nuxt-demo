<template>
  <div>
    <!-- <div class="detail-contant" v-loading="detailLoading"> -->
    <div class="detail-contant">
            <h4 class="detail-title">{{title}}</h4>
            <div v-html="content" class="content">
            </div>
            <div v-show="hasArtic" class="no-detaildata"> 
                文章不存在或已删除
            </div>
        </div>
  </div>
</template>

<script>
import { getArticDetail } from "@/api";

export default {
  data() {
    return {
      hasArtic: true
    };
  },
  async asyncData(ctx) {
    let articId = ctx.params.id;
    let hasArtic = false
    let { title,content } = await getArticDetail({ id: articId });
    // let datas = await getArticDetail({ id: articId });
    // console.log(datas)
    if(title && content){
        return {
            title,
            content,
            hasArtic:false
        }
    }else{
        return {
            title:"",
            content:"",
            hasArtic:true
        }
    }
    
  },
  mounted() {
    
    // this.getArticDetail()
  },
  methods: {
    async getArticDetail() {
      let articId = this.$route.params.id;
      if (!articId) {
        this.$router.push("/");
        return;
      }

      this.detailLoading = true;
      let params = { id: articId };
      try {
        let datas = await getArticDetail(params);
        if (datas !== null) {
          this.detail = datas;
          this.hasArtic = false;
        } else {
          this.hasArtic = true;
        }
      } catch (error) {
        this.hasArtic = true;
        console.log(error);
        // this.$message.error(error.message);
      }
      this.detailLoading = false;
    }
  }
};
</script>

<style lang="scss">
.detail-contant {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  overflow: hidden;
  .detail-title {
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
    color: #333;
    height: 100px;
    line-height: 100px;
    background: #f5faf8;
    border-radius: 3px;
    margin-bottom: 30px;
  }
  p {
    text-align: left;
    line-height: 24px;
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .no-detaildata {
    color: #999;
    text-align: center;
    font-size: 13px;
  }
}
</style>

