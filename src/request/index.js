
window.apiRoot = '.'


export const apiPathList = {

    //获取订单列表(懒加载) get {lastId,pageNumber}
    getOrderList: apiRoot + "/staff/order/getOrderList",

    //获取单个订单信息 get {id}
    getOrder: apiRoot + "/staff/order/getOrder",

    // 手机号查重
    checkWorkerPhone: apiRoot + "/admin/staff/checkStaffPhone",
    
    // 门店添加劳动者
    createStaffBySeller : apiRoot+"/admin/staff/createStaffBySeller",

}