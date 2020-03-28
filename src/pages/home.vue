<template>
    <Hog-page>
        <div class="home">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item
                    v-for="(image, index) in adPosition.S000001.resource"
                    :key="index">
                    <van-image :src="image.url" height="2rem" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <Hog-footer></Hog-footer>
    </Hog-page>
</template>

<script>


import {homeService} from '@/service/index.js'

import Vue from 'vue'
export default {
    data(){
        return {
            adPosition:{
                S000001: {},
                S000002: {},
                S000003: {},
                S000004: {},
                S000005: {},
            },
        }
    },
    methods:{

    },
    async mounted(){
        await homeService.getAdPosition().then(data =>{
            this.adPosition = {
                ...data.data.data
            }
            // console.log(data)
            // Vue.set(this.adPosition,'S000001',data.data.data.S000001)
        }).catch(error => {
            throw error
        })
    }
}
</script>

<style scoped lang="scss">
.home{
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        // line-height: 150px;
        height: 2rem;
        text-align: center;
        background-color: #39a9ed;
    }
}
</style>




