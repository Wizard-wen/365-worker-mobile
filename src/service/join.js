import {apiPathList} from '@/request/index.js'

import axios from 'axios' 
import {$utils} from '../utils/index.js'



export const joinService = {
    /**
     * 获取订单列表
     */
    createStaffBySeller(sendForm,accessToken){
        return axios.post(apiPathList.createStaffBySeller,{
            ...sendForm,
        },{
            headers: {accessToken: accessToken},
        })
    },
    checkWorkerPhone(sendForm){
        return axios.post(apiPathList.checkWorkerPhone,{
            ...sendForm,
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    login(username, password){
        return axios.post(`./admin/login`,{
            account: username,
            password: password
        })
    },
}