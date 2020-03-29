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




