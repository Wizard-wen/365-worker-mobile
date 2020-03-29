import {apiPathList} from '@/request/index.js'

import axios from 'axios' 
import {$utils} from '../utils/index.js'



export const joinService = {
    /**
     * 获取订单列表
     */
    createStaffBySeller(sendForm,accessToken){
        debugger
        return axios.post(apiPathList.createStaffBySeller,{
            ...sendForm,
        },{
            headers: {accessToken: accessToken},
        })
    },
    checkWorkerPhone(sendForm){
        return axios.post(apiPathList.checkWorkerPhone,{
            ...sendForm,
        })
    },
    login(username, password){
        return axios.post(`./admin/login`,{
            account: username,
            password: password
        })
    },
}