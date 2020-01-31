
<template>
    <div class="sea-server">
        <div class="img-box">
            <img src="~assets/images/banner03.png" alt="">
        </div>
        <div class="info-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="ipt-item">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-item">
                <el-form-item label="电话号码" prop="tel">
                    <el-input v-model="ruleForm.tel" placeholder="请输入电话号码(国外客户填微信)"></el-input>
                </el-form-item>
                </div>
                <div class="ipt-item">
                <el-form-item label="公司名称">
                    <el-input v-model="ruleForm.company_name" placeholder="请输入公司名字"></el-input>
                </el-form-item>
                </div>
                <div class="ipt-item">
                <el-form-item label="电子邮件">
                    <el-input v-model="ruleForm.email" placeholder="请输入电子邮件"></el-input>
                </el-form-item>
                </div>
                <div class="ipt-item">
                <el-form-item label="职务">
                    <el-input v-model="ruleForm.position" placeholder="请输入职务"></el-input>
                </el-form-item>
                </div>
                <div class="ipt-item">
                <el-form-item>
                    <el-button :loading="reservationLoading" class="reservation-btn" type="primary" @click="submitForm('ruleForm')">{{reservationText}}</el-button>
                </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getReservation } from "@/api"

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                tel:"",
                company_name:"",
                email:"",
                position:""
            },
            rules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                tel:[
                    { required: true, message: '请填写姓名手机号码(国外用户填微信)', trigger: 'blur' }
                ],
                
            },
            reservationLoading:false,
            reservationText:"预约"
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
                if(this.ruleForm.email.length && !reg.test(this.ruleForm.email)){
                    this.$message.warning("邮箱格式有误");
                    return;
                }
                this.getReservation()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        async getReservation(){
            this.reservationLoading = true;
            this.reservationText = "预约中"
            try {
                let datas = await getReservation(this.ruleForm)
                this.$message.success("预约成功！");
                this.resetForm()
            } catch (error) {
                this.$message.error(error.message);
            }
            this.reservationLoading = false;
            this.reservationText = "预约"
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
            this.ruleForm.company_name = ""
            this.ruleForm.email = ""
            this.ruleForm.position = ""
        }
        
    },
    components:{
    }
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
    .sea-server{
        width: 100%;
        .img-box{
            width: 100%;
            height: 260px;
            overflow: hidden;
            img{
                height: 260px;
            }
        }
        .info-box{
            width: 750px;
            margin: 100px auto;
            .ipt-item{
                margin-bottom: 30px;
            }
        }
    }
    .reservation-btn{
        width: 100%;
        background: #007947;
    }
    
</style>
<style >
    /* .el-input__inner{
        border: 1px solid #f1f1f1;
    } */
</style>

