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
                :rules="[{ validator: checkWorkerPhone,required: true, message: '请填写手机号' }]"/>
            <van-field
                type="textarea"
                name="个人信息"
                v-model="joinForm.seller_remarks"
                label="个人信息"
                :rules="[{ required: true, message: '请填写您的个人情况' }]"
                placeholder="请输入您的个人情况"/>
            <div style="margin: .5rem .1rem 0 .1rem;">
                <van-button round block type="info" color="#ff7832" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import {joinService} from '@/service/join'
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
                name: '',
                phone: '',
                id:0,
                seller_remarks: '',
            },
            phoneError: '',
            logo,
        }
    },
    methods: {
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
            let accessToken = ''
            await joinService.login('dev_songxiwen','dev_songxiwen').then(data =>{
                accessToken = data.data.data.manager.access_token
            })
            try{
                Toast.loading('提交中...');
                 await joinService.createStaffBySeller(sendForm,accessToken).then(data =>{
                
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
    }
}
</script>

<style scoped lang="scss">
.logo-box{
    // height: 1.5rem;
    padding: .6rem 0 .2rem 0;
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
</style>