<template>
    <div >
        <van-nav-bar
        :fixed="true"
        title="订单"/>
        <van-list
            class="order-list"
            v-model="loading"
            :isLast="isLast"
            isLast-text="没有更多了"
            @load="onLoad">
            <van-panel 
                @click="goOrderDetailPage(item)"
                class="order-panel"
                :title="item.work_type" 
                :desc="item.service_duration" 
                status="待签约"
                v-for="(item, index) in orderList"
                :key="index">
                <div class="order_details">{{item.order_details}}</div>
            </van-panel>
        </van-list>
    </div>
</template>

<script>


import {homeService} from '@/service/index.js'
// require('http://res.wx.qq.com/open/js/jweixin-1.6.0.js')  
// console.log(wxx)
export default {
    data(){
        return {
            loading:false,
            lastId: 0,
            isLast: false,
            orderList: [],
            pageNumber: 10,
        }
    },
    methods:{
        async onLoad() {
            if (!this.isLast) {
                await this.getOrderList(this.lastId)
                // 加载状态结束
                this.loading = false;

                // // 数据全部加载完成
                // if (this.isLast) {
                //     this.finished = true;
                // }
            } else {
                // 加载状态结束
                this.loading = false;
            }
        },
        async getOrderList(){
            let sendForm = {
                lastId: this.lastId,
                pageNumber: this.pageNumber,
            }
            await homeService.getOrderList(sendForm).then(data =>{

                this.orderList = this.orderList.concat(data.data.data.data)
                this.lastId = data.data.data.lastId
                this.isLast = data.data.data.isLast
            }).catch(error => {
                throw error
            })
        },
        goOrderDetailPage(param){
            this.$router.push({
                path: '/orderDetail',
                query: {
                    id: param.id
                }
            })
        }
    },
    async mounted(){
        // await this.onLoad()

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
                        'onMenuShareAppMessage','updateAppMessageShareData','onMenuShareTimeline',
                    ]
                });
                wx.ready(function () {
                    // 老版本
                    wx.onMenuShareAppMessage({ 
                        title: '365订单', // 分享标题
                        desc: '365生活服务平台，竭诚为您服务', // 分享描述
                        // link: 'https://staffh5.sy365.cn/#/homepage', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        link: window.location.href,
                        imgUrl: 'https://staffh5.sy365.cn/icon.jpg', // 分享图标
                        success: function () {
                            // 设置成功
                            // wx.checkJsApi({
                            //     jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            //     success: function(res) {
                            //         // 以键值对的形式返回，可用的api值true，不可用为false
                            //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            //         alert(res)
                            //     }
                            // })
                            Notify({ type: 'success', message: '分享成功' });  
                        }
                    })
                    // // 新版本
                    // wx.updateAppMessageShareData({ 
                    //     title: '365订单', // 分享标题
                    //     desc: '365订单描述', // 分享描述
                    //     // link: 'https://staffh5.sy365.cn/#/homepage', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //     link:window.location.href,
                    //     imgUrl: 'https://staffh5.sy365.cn/icon.jpg', // 分享图标
                    //     success: function () {
                    //         // 设置成功
                    //         wx.checkJsApi({
                    //             jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //             success: function(res) {
                    //                 // 以键值对的形式返回，可用的api值true，不可用为false
                    //                 // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    //                 alert(res)
                    //             }
                    //         })
                    //     }
                    // })
                    wx.onMenuShareTimeline({
                        title: '365订单', // 分享标题
                        desc: '365生活服务平台，竭诚为您服务', // 分享描述
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
    .order-list{
        padding-top: .5rem;
    }
    .order-panel{
        margin: .2rem;
        .order_details{
            padding: .2rem;
        }
    }
    
// }
</style>




