<template>
    <div>
        <van-nav-bar
        :fixed="true"
        left-arrow
        @click-left="onClickLeft"
        title="订单详情"/>
        <van-loading class="loading" v-if="is_loading" size="24px" vertical>加载中...</van-loading>
        <van-panel 
            class="order-panel"
            :title="orderDetail.work_type" 
            :desc="orderDetail.wage" 
            status="待签约">
            <div class="order_des">{{orderDetail.service_duration}}</div>
            <div class="order_des">{{orderDetail.service_address}}</div>
        </van-panel>
        <div class="order_details">
            <div class="title">订单详情</div>
            <div class="contains">{{orderDetail.order_details}}</div>
        </div>
        <div class="order_details">
            <div class="title">安置老师</div>
            <div class="contains">{{orderDetail.agent_manager_name | getParentName}}</div>
        </div>
        <div class="order_details">
            <div class="title">电话</div>
            <div class="contains">{{orderDetail.agent_manager_phone}}</div>
        </div>
        <a class="btn" :href="'tel:'+orderDetail.agent_manager_phone">立即接单</a>
    </div>
</template>

<script>
import {homeService} from '@/service/index.js'
import axios from 'axios'
export default {
    data(){
        return {
            is_loading: false,
            orderDetail: {

            }
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        async getOrder(){
            this.is_loading = true
            await homeService.getOrder(this.$route.query.id).then(data =>{
                this.orderDetail = data.data.data
                this.is_loading = false
            }).catch(error =>{
                this.is_loading = false
            })
        },
    },
    filters: {
        getParentName(val){
            val = String(val);
            return val[0]?val[0]+'老师':'-'
        }
    },
    async mounted(){
        await this.getOrder()
    }
}
</script>

<style scoped lang="scss">
.loading{
    margin-top: .5rem;
}
.order-panel{
    margin: .7rem .2rem .2rem .2rem;
    .order_des{
        padding: 0 .2rem;
        line-height: .4rem;
    }
}
.order_details{
    padding: .1rem .3rem;
    .title{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: .2rem;
    }
    .contains{
        font-size: 14px;
        color: #333;
    }
}
.btn{
    color: #fff;
    text-align: center;
    line-height: .4rem;
    border-radius: 6px;
    background: #ff7832;
    display: block;
    position: fixed;
    height: .4rem;
    width: 2rem;
    bottom: .2rem;
    left: calc(50% - 1rem);
}
</style>