import {apiPathList} from '@/request/index.js'

import axios from 'axios' 
import {$utils} from '../utils/index.js'
import jsSHA from 'jssha'



// console.log(jssha)
// jsSHA = require('jssha');
export const homeService = {
    /**
     * 获取订单列表
     */
    getOrderList(sendForm){
        let paramUrl = $utils.changeObjectToPathString(sendForm)
        return axios.get(apiPathList.getOrderList+paramUrl)
    },
    getOrder(id){
        return axios.get(apiPathList.getOrder+"?id="+id)
    },
    getWxShareConfig(wechaturl){
      return axios.get(apiPathList.getWxShareConfig+`?wechaturl=${wechaturl}`)
    }
}
  