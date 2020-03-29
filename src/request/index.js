
window.apiRoot = '.'


export const apiPathList = {
  //获取验证码 get {phone}
  getCaptcha: apiRoot + "/staff/getCaptcha",

  //登录 post {phone,captcha}
  login: apiRoot + "/staff/login",



  //编辑用户信息 post {id,name}
  editUser: apiRoot + "/user/personal/editUser",

  //上传头像 post {id, icon}
  editIcon: apiRoot + "/user/personal/editIcon",



  //获取服务分类 get
  getCategory: apiRoot + "/user/service/getCategory",

  //获取订单列表(懒加载) get {lastId,pageNumber}
  getOrderList: apiRoot + "/staff/order/getOrderList",

  //获取单个订单信息 get {id}
  getOrder: apiRoot + "/staff/order/getOrder",



  //获取视频列表(懒加载) get {lastId,pageNumber}
  getVideoList: apiRoot + "/staff/common/getVideoList",

  //获取单个视频 get {id}
  getVideo: apiRoot + "/staff/common/getVideo",

  






  //广告位
  getAdPosition: apiRoot + "/staff/common/getAdPosition",


}