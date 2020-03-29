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

<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js" ></script>
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
        // async share(){
        //     var imgUrl = 'http://dev.mymax.cn/affix/manmanhouse/images/share.jpg'; 
        //     var lineLink = 'https://workerh5.sy365.cn'; 
        //     var descContent = '人类天生就爱玩游戏，游戏为什么吸引人？如果借助游戏的规律，是否可以让工作学习变得更精彩？';
        //     var shareTitle = '游戏化学习工作坊第四站-北京清华科技园';
            
        //     await homeService.sign('jsapi_ticket','https://workerh5.sy365.cn').then(data =>{
        //         console.log(data)
        //         var appId = 'wxa7f8e32f58d1d739';
        //         var timestamp = data.s.timeStamp;
        //         var nonceStr = data.s.nonceStr;
        //         var signature = data.s.signature;

        //         wx.config({
        //             debug: false,
        //             appId: appId,
        //             timestamp: timestamp,
        //             nonceStr: nonceStr,
        //             signature: signature,
        //             jsApiList: [
        //                 'checkJsApi',
        //                 'onMenuShareTimeline',
        //                 'onMenuShareAppMessage'
        //             ]
        //         });
        //          wx.ready(function() {
        //             wx.onMenuShareTimeline({
        //                 title: shareTitle, // 分享标题
        //                 link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //                 imgUrl: imgUrl, // 分享图标
        //                 success: function () {
        //                     // 用户确认分享后执行的回调函数
        //                 },
        //                 cancel: function () {
        //                     // 用户取消分享后执行的回调函数
        //                 }
        //             });

        //             wx.onMenuShareAppMessage({
        //                 title: shareTitle, // 分享标题
        //                 desc: descContent, // 分享描述
        //                 link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //                 imgUrl: imgUrl, // 分享图标
        //                 type: '', // 分享类型,music、video或link，不填默认为link
        //                 dataUrl:'' , // 如果type是music或video，则要提供数据链接，默认为空
        //                 success: function () {
        //                     // 用户确认分享后执行的回调函数
                            
        //                 },
        //                 cancel: function () {
        //                     // 用户取消分享后执行的回调函数
        //                 }
        //             });
        //         });
 
        //     })
        // }
    },
    filters: {
        getParentName(val){
            val = String(val);
            return val[0]?val[0]+'老师':'-'
        }
    },
    async mounted(){
        // await this.share()
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