<template>
    <div>
        <van-nav-bar
            :fixed="true"
            title="加入我们"/>
        <div class="logo-box">
            <div style="height: 1.2rem;width: 1.2rem;margin: 0 auto;">
                <van-image
                    width="120"
                    height="120"
                    :src="logo"/>
            </div>
            
        </div>

        <van-form @submit="submit">
            <h2 class="van-doc-demo-block__title">基本信息</h2>
            <van-field
                v-model="joinForm.name"
                name="姓名"
                label="姓名"
                placeholder="请填写姓名"
                :rules="[{ required: true, message: '请填写用户名' }]"/>
            <van-field
                v-model="joinForm.phone"
                name="手机号"
                label="手机号"
                placeholder="请填写手机号"
                :rules="[
                    { required: true,message: '只能是数字' },
                    { validator: checkWorkerPhone,required: true, message: '请填写手机号' }
                ]"/>
            
            <van-field name="radio" label="性别">
                <template slot="input">
                    <van-radio-group v-model="joinForm.sex" direction="horizontal">
                        <van-radio :name="1">男</van-radio>
                        <van-radio :name="2">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field> 
            <van-field
                v-model="joinForm.identify"
                name="身份证号"
                label="身份证号"
                placeholder="请填写身份证号"/>
            
            <van-field
                readonly
                clickable
                name="datetimePicker"
                v-model="joinForm.birthdayFormatter"
                label="生日"
                placeholder="点击选择生日"
                @click="isBirthdayPopupShow = true"/>

            <van-field
                readonly
                clickable
                name="picker"
                v-model="joinForm.educationFormatter"
                label="学历"
                placeholder="点击选择学历"
                @click="isEducationPopupShow = true"/>
            
            
            <van-field name="radio" label="婚姻状况">
                <template slot="input">
                    <van-radio-group v-model="joinForm.is_married" direction="horizontal">
                        <van-radio :name="1">是</van-radio>
                        <van-radio :name="2">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field> 

            <van-field
                readonly
                clickable
                name="picker"
                v-model="joinForm.zodiac_signFormatter"
                label="生肖"
                placeholder="点击选择生肖"
                @click="isZodiac_signPopupShow = true"/>
            <van-field
                v-model="joinForm.body_height"
                name="身高"
                label="身高"
                placeholder="请填写身高"/>
            
            <van-field
                v-model="joinForm.body_weight"
                name="体重"
                label="体重"
                placeholder="请填写体重"/>
            
            <!-- <van-field name="uploader" label="头像">
                <template slot="input">
                    <van-uploader :after-read="uploadPicture" v-model="joinForm.icon" />
                </template>
            </van-field> -->
            
            <van-field
                v-model="joinForm.address"
                name="现住址"
                label="现住址"
                placeholder="请填写现住址"/>
            <van-field
                v-model="joinForm.urgent_phone"
                name="紧急联系人"
                label="紧急联系人"
                placeholder="请填写紧急联系人"/>
            <van-field
                v-model="joinForm.address_in_law"
                name="户籍地址"
                label="户籍地址"
                placeholder="请填写户籍地址"/>

            <h2 class="van-doc-demo-block__title">备注信息</h2>
            <van-field
                type="textarea"
                name="备注信息"
                v-model="joinForm.remarks"
                label="备注信息"
                placeholder="请输入您的备注信息"/>
            
            <!-- 生日日期列表 -->
            <van-popup v-model="isBirthdayPopupShow" position="bottom">
                <van-datetime-picker
                    type="date"
                    v-model="currentDate"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="setBirthday"
                    @cancel="isBirthdayPopupShow = false"/>
            </van-popup>
            
            <!-- 学历列表 -->
            <van-popup v-model="isEducationPopupShow" position="bottom">
                <van-picker
                    show-toolbar
                    :value-key="'name'"
                    :columns="workerConfigForm.educationList"
                    @confirm="setEducation"
                    @cancel="isEducationPopupShow = false"/>
            </van-popup>

            <!-- 生肖列表 -->
            <van-popup v-model="isZodiac_signPopupShow" position="bottom">
                <van-picker
                    show-toolbar
                    :value-key="'name'"
                    :columns="workerConfigForm.zodiac_signList"
                    @confirm="setZodiac_sign"
                    @cancel="isZodiac_signPopupShow = false"/>
            </van-popup>
            
            <div style="margin: .5rem .1rem 0.5rem .1rem;">
                <van-button round block type="info" color="#ff7832" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import {$utils} from '@/utils/index.js'
import {educationList,zodiac_signList} from './join/Ijoin.js'

import {joinService} from '@/service/join'
import {homeService} from '@/service/index.js'
import axios from 'axios'


import { Notify } from 'vant';
import { Toast } from 'vant';
// import { Image } from 'vant';

import logo from './join/logo.jpg'
import Vue from 'vue'
Vue.use(Notify);
Vue.use(Toast);
// Vue.use(Image);
export default {
    data(){
        return {
            joinForm: {
                id: 0,
                name: '',//姓名
                phone: '',//电话
                sex: 1,//性别
                identify: '',//身份证号
                
                birthday: 0,//生日
                birthdayFormatter: '',
                
                education: 0,//教育程度
                educationFormatter: '',
               
                is_married: 1,//婚姻状况

                zodiac_sign: 0,//生肖
                zodiac_signFormatter: '',
                body_height: '',//身高
                body_weight: '',
                
                icon:'',//头像

                address: '',//现住址
                urgent_phone: '',//紧急联系人
                address_in_law: '',//户籍地址
                
                id:0,
                remarks: '',
            },
            
            isBirthdayPopupShow: false,
            isEducationPopupShow: false,
            isZodiac_signPopupShow: false,
            educationList: [{
                id: 1,
                name: '初中',
            },{
                id: 2,
                name: '高中',
            },],
            workerConfigForm: {
                educationList,
                zodiac_signList,
            },
        
            

            currentDate: new Date(),
            minDate: new Date(1900, 1, 1),
            maxDate: new Date(2025, 10, 1),
            
            phoneError: '',
            
            logo,
        }
    },
    methods: {
        // 设置教育程度
        setEducation(value) {
            this.joinForm.education = value.id;
            this.joinForm.educationFormatter = value.name;
            this.isEducationPopupShow = false;
        },
        // 设置生日
        setBirthday(value){
            // 展示字段
            this.joinForm.birthdayFormatter = $utils.formatDate(value, 'yyyy-MM-dd')
            // 时间戳
            this.joinForm.birthday = value.valueOf()
            // 时间组件
            this.isBirthdayPopupShow = false
        },
        // 设置生肖
        setZodiac_sign(value){
            // 展示字段
            this.joinForm.zodiac_signFormatter =value.name;
            // 
            this.joinForm.zodiac_sign = value.id;
            // 
            this.isZodiac_signPopupShow = false
        },
        // 
        uploadPicture(file){
            console.log(file)
        },
        async checkWorkerPhone(){
            let sendForm = {
                phone: this.joinForm.phone,
                id: 0,
            }
             
            try{
                 Toast.loading('验证中...');
                 await joinService.checkWorkerPhone(sendForm).then(data =>{
                    if(data.data.code == '1'){
                        Notify({ type: 'success', message: '您已经是我们的一员了，不必再次提交！'});
                        return false
                    } else {
                        return true
                    }
                    Toast.clear();
                }).catch(error => {
                    throw error
                    Notify({ type: 'danger', message: error.message });
                    Toast.clear();
                }).finally(() =>{
                    Toast.clear();
                })
             } catch(error) {
                 Notify({ type: 'danger', message: error.message });
                 Toast.clear();
             }
            
        },
        async submit(){
            let sendForm ={
                ...this.joinForm,
            } 
            try{
                Toast.loading('提交中...');
                 await joinService.createStaffBySeller(sendForm).then(data =>{
                
                    if(data.data.code == '0'){
                       Notify({ type: 'success', message: data.data.message });  
                    } else {
                        Notify({ type: 'danger', message: data.data.message });
                    }
                    Toast.clear();

                }).catch(error => {
                     Notify({ type: 'danger', message: error.message });
                     Toast.clear();
                }).finally(() =>{
                    Toast.clear();
                })
            } catch(error){
                 Notify({ type: 'danger', message: error.message });
                 Toast.clear();
            }
           
        }
    },
    async mounted(){
        let wechaturl = decodeURIComponent(window.location.href.split('#')[0]);
        

        await homeService.getWxShareConfig(wechaturl).then(data =>{

            wx.config({
                debug: false,
                appId: data.data.appId,
                timestamp: data.data.timestamp,
                nonceStr: data.data.nonceStr,
                signature: data.data.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareAppMessage','onMenuShareTimeline',
                ]
            });
            wx.ready(function () {
                // 老版本
                wx.onMenuShareAppMessage({ 
                    title: '365生活服务平台', // 分享标题
                    desc: '365生活服务平台，加入我们!', // 分享描述
                    link: window.location.href,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://staffh5.sy365.cn/icon.jpg', // 分享图标
                    success: function () {
                        Notify({ type: 'success', message: '分享成功' });  
                    }
                })
                wx.onMenuShareTimeline({
                    title: '365生活服务平台', // 分享标题
                    desc: '365生活服务平台，加入我们!', // 分享描述
                    link: window.location.href,
                    imgUrl: 'https://staffh5.sy365.cn/icon.jpg', // 分享图标
                    success: function () {
                        Notify({ type: 'success', message: '分享成功' });  
                    }
                })
            });
        })
    }
}
</script>

<style scoped lang="scss">
.logo-box{
    // height: 1.5rem;
    padding: .6rem 0 0 0;
    width: 100%;
}
.form-item-style{
    margin-bottom: .2rem;
}
.btn-style{
    width: 80%;
    margin: 0 auto;
    display: block;
}
.van-doc-demo-block__title{
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
}
</style>