import {apiPathList} from '@/request/index.js'

import axios from 'axios' 

export const homeService = {
    getAdPosition(){
        return axios.get(`./user/common/getAdPosition`)
    }
}