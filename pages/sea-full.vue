<template>
    <div>
        <img class="full-logo" src="~/assets/images/SHIPPING ON TIME.png" alt="">
        <div class="full-content">

            <my-search @ectentAdvancedSearch="ectentAdvancedSearch" :isEctents="isEctents"
            :origins="origins" :destinations="destinations" @search="search" :start="params.origin_id" :end="params.country_code"></my-search>
            <div class="condition-box" :class="{'active-box':isEctents}">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <div class="week-type">
                            <span>班期</span>
                            <el-checkbox-group @change="selectWhichDay" v-model="which_day_bac">
                                <el-checkbox class="radio-item" :label="item.name" v-for="(item,index) in which_day" :key="index"></el-checkbox>
                            </el-checkbox-group>
                        </div>   
                    </el-col>
                    
                    <el-col :span="8">
                        <div class="cabinet-type">
                            <el-row>
                                <el-col :span="4">
                                    <span class="day-aging">时效</span>
                                </el-col>
                            
                                <el-col :span="9">
                                    <el-input
                                        @input="changeDay"
                                        size="mini"
                                        placeholder="输入开始天数"
                                        v-model="params.days_min">
                                    </el-input>
                                </el-col>
                                <el-col :span="9">
                                    <el-input
                                        @input="changeDay"
                                        size="mini"
                                        placeholder="输入结束天数"
                                        v-model="params.days_max">
                                    </el-input>
                                </el-col>
                                <el-col :span="2">
                                    <span class="day-aging">天</span>
                                </el-col>    
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top:10px;">
                    <el-col :span="24">
                        <div class="cabinet-type tiji-box">
                            <span>体积系数</span>
                            <el-checkbox-group @change="selectVolRates" v-model="params.volume_factor">
                                <el-checkbox class="radio-item" :label="item" v-for="(item,index) in vol_rates" :key="index"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="table-box table-box-title" v-show="tableList.length">
                <div class="table-item">
                    <div class="no">NO</div>
                    <div class="table-left">物流产品名称</div>
                    <div class="table-area">分区</div>
                    <div class="table-price table-price-title">
                        <p class="table-price-title-item" v-for="(t,i) in interval" :key="i">价格</p>
                    </div>
                    <div class="table-right">时效</div>
                </div>
            </div>
            <div class="table-box table-box-list" v-loading="tableLoading">
            <!-- <div class="table-box table-box-list"> -->
                <div v-for="(item,index) in tableList" :key="index" class="table-item">
                    <div class="no">{{index+1}}</div>
                    <div class="table-left">{{item.name}}</div>
                    <div class="table-area">
                        <p class="table-area-p"></p>
                        <p class="table-area-p" v-for="(everys,idx) in item.zonePrices" :key="idx">
                            {{everys.zone_name}}
                        </p>
                    </div>
                    <div class="table-price">
                        <div v-for="(everys,j) in item.zonePrices" :key="j" class="table-price-item">
                            <div v-for="(t,i) in everys.prices" :key="i" class="price-item-every">
                                <p v-show="j ==0" class="weight">{{t.range}}</p>
                                <p class="money">{{t.value}}</p>
                            </div>
                             
                        </div>
                    </div>
                    <div class="table-right">{{item.delivery_time}}天</div>
                </div>
            </div>

            <div class="no-data" v-show="!tableList.length && !tableLoading">
                暂无数据
            </div>

        </div>
    </div>
</template>
<script>
import MySearch from "@/components/common/Search"
import { getSeabulkBaseData,getSeabulkList } from "@/api"
import { formatSelectCheckout } from "@/utils/utils"
import _ from "lodash"
export default {
    data() {
        return {
            interval:null,
            tableList:[],
            tableLoading:false,
            isEctents:false,
            origins:[],      //起始地
            destinations:[],        //目的地
            params:{
                class_code:2,          //类型，1空运 2海运 3小包
                origin_id:"",           //起始id
                country_code:"",        //目的国家代码
                days_min:"",            //最小天数
                days_max:"",            //最大天数
                which_day:[],           //班期
                volume_factor:[],        //体积系数
            },
            which_day_bac:[],
            which_day:[
                {id:1,name:"周一"},
                {id:2,name:"周二"},
                {id:3,name:"周三"},
                {id:4,name:"周四"},
                {id:5,name:"周五"},
                {id:6,name:"周六"}
            ],
            vol_rates:[]        //体积系数


        }
    },
    created(){
    },
    mounted() {
        if(this.$route.query.start && this.$route.query.end){
            this.getSeabulkBaseData()
            this.params.origin_id =Number(this.$route.query.start) 
            this.params.country_code = this.$route.query.end;
            this.getSeabulkList()
            
        }else{
            this.getSeabulkBaseData()
            this.getSeabulkList()
        }
    },
    methods: {
        changeDay:_.debounce(function(){
            this.getSeabulkList()
        },400),
        selectVolRates(){   //体积系数
            this.getSeabulkList()
        },
        selectWhichDay(){   //班期
            this.params.which_day = formatSelectCheckout(this.which_day_bac,this.which_day);
            this.getSeabulkList()
        },
        search(e){
            this.params.which_day = formatSelectCheckout(this.which_day_bac,this.which_day);

            this.params.origin_id = e.origin_id;
            this.params.country_code = e.destination_id;

            this.getSeabulkList()
        },
        ectentAdvancedSearch(e){
            this.isEctents = e;
        },
        async getSeabulkList(){
            this.tableList = []
            this.tableLoading = true
            try {
                
                let datas = await getSeabulkList(this.params)
                this.tableList = datas.rows;
                this.interval = datas.interval;
                // setTimeout(()=>{
                //     this.tableList = datas.rows;
                // },2000)

                this.tableLoading = false
                
            } catch (error) {
                this.$message.error(error.message);
                this.tableLoading = false
            }

            // this.tableLoading = false
            
        },
        async getSeabulkBaseData(){
            this.dataLoading = true
            try {
                let datas = await getSeabulkBaseData()
                // this.origins = datas.origins;
                this.vol_rates = datas.vol_rates;
                datas.origins.forEach((el,index)=>{
                    let item = {
                        id:Number(el.id),
                        name:el.name
                    }
                    this.origins.push(item)
                })
                datas.destinations.forEach((el,index)=>{
                    let item = {
                        id:el.code,
                        name:el.name
                    }
                    this.destinations.push(item)
                })
            } catch (error) {
                this.$message.error(error.message);
            }
            this.dataLoading = false
        },
        ectentAdvancedSearch(){
            this.isEctents = !this.isEctents
           
        },
      
    },
    components:{
        MySearch
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.table-box{
    overflow: hidden;
    width: 1200px;
    margin:0 auto;
    .table-item{
        width: 100%;
        font-size: 13px;
        padding: 20px 0;
        overflow: hidden;
        display: flex;
        display: -webkit-flex; /* Safari */
        align-items:center;
        border-bottom: 1px solid #f1f1f1;
        &:hover{
            background: #f1f1fa;
        }
        .no{
            width: 50px;
            text-align: center;
            color: #777777;
            float: left;
        }
        .table-left{
            width: 150px;
            float: left;
            text-align: center;
            color: rgb(119, 119, 119);
        }
        .table-area{
            width: 100px;
            float: left;
            text-align: center;
            .table-area-p{
                height: 20px;
                line-height: 20px;
                color: rgb(119, 119, 119);
            }
        }
        .table-price{
            flex: 1;
            float: left;
            text-align: center;
            .table-price-item{
                width: 100%;
                display: flex;
                text-align: center;
                .price-item-every{
                    flex: 1;
                    text-align: center;
                    p{
                        color: #93b728;
                        height: 20px;
                        line-height: 20px;
                    }
                    .weight{
                        color: #007947
                    }
                }
            }
            
        }
        .table-right{
            width: 80px;
            text-align: center;
            // color: #948686;
            color: #FF2727;
        }
        
    }
}
.table-box-title{
    text-align: center;
    font-size: 14px;
    border-top: 2px solid #007947;
    // background-color: rgb(241, 241, 241);
    background: #f5faf8;
    .table-price-title{
        display: flex;
        .table-price-title-item{
            flex: 1;
            color: rgb(102, 102, 102);
            font-weight: bold;
        }
    }
    .no{
        width: 50px;
    }
    .table-left,
    .table-area,
    .table-right,
    .no{
        color: rgb(102, 102, 102)!important;
        font-weight: bold;
        text-align: center;
    }
}
.full-content{
    width: 1200px;
    margin: 0 auto;
    min-height: 700px;
}
    .full-logo{
        border: 0;
        display: block;
        width: 100%;
    }
    
    .cabinet-type,.week-type,{
        height: 40px;
        line-height: 40px;
        border: 1px solid #f1f1f1;
        padding: 0 10px;
        font-size: 15px;
        color: #007947;
        border-radius: 5px;
        span{
            margin-right: 28px;
            font-size: 15px;
            float: left;
        }
        .radio-item{
            margin-right: 20px;
        }
    }
    .tiji-box{
        display: inline-block;
    }
    .day-aging{
        margin: 0!important;
    }
   
    .table-box{
        margin-top: 25px;
    }
    .pagination{
        padding: 20px 50px;
        text-align: center;
    }
    .condition-box{
        height: 100px;
        overflow: hidden;
        @include transitons(.2s);
        // &.outh-height{
        //     height: 100px;
        // }
        &.active-box{
            height: 0;
        }
        
    }
   .table-box-list{
       margin-top: 0;
   }
   .no-data{
       height: 50px;
       background: #f1f1f1;
       font-size: 15px;
       text-align: center;
       line-height: 50px;
       color: #666;
       margin-top:100px;
   }
   .money{
       color:#FF9027!important;
   }
</style>

<style>
.el-range-separator{
    width: auto!important;
}
.el-radio__input.is-checked .el-radio__inner{
    border-color: #007947;
    background: #007947;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #007947;
}
.el-checkbox__input.is-checked .el-checkbox__inner, 
.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color: #007947;
    background: #007947;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #007947;
}
.el-checkbox-group{
    display: inline-block;
}
</style>



