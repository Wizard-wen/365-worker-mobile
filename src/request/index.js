
window.apiRoot = 'https://manage.sy365.cn'

// 上线前应当切换这个
window.staffh5Root = 'https://staffh5.sy365.cn'
window.staffh5TestRoot = '.'
export const apiPathList = {

    //获取订单列表(懒加载) get {lastId,pageNumber}
    getOrderList: apiRoot + "/staff/order/getOrderList",

    //获取单个订单信息 get {id}
    getOrder: apiRoot + "/staff/order/getOrder",

    // 手机号查重
    checkWorkerPhone: apiRoot + "/staff/common/checkStaffPhone",
    
    // 门店添加劳动者
    createStaffBySeller : apiRoot+"/staff/common/applyStaff",
    
    //获取微信分享config信息
    getWxShareConfig: staffh5TestRoot +"/auth/getWxShareConfig.php"
}













