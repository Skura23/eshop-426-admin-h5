import request from '@/utils/request'

var api = {}
// 通过遍历生成接口
// 调用方法: api.services_staff_edit
let apiList = [
  // 服务人员 相关
  "services_staff_edit|services",
  // 优惠券
  "coupon_create|coupon",
  "coupon_list|coupon",
  "coupon_detail|coupon",
  "coupon_delete|coupon",
  "coupon_change_status|coupon",
  // 积分商城 商品
  "integral_goods_create|integral",
  "integral_goods_list|integral",
  "integral_goods_detail|integral",
  "integral_goods_edit|integral",
  "integral_goods_put_away|integral",
  // 砍价商品
  "bargain_goods_create|bargain",
  "bargain_goods_list|bargain",
  "bargain_goods_edit|bargain",
  "bargain_goods_detail|bargain",
  "bargain_goods_put_away|bargain",
  // 秒杀活动
  "seckill_create|seckill",
  "seckill_list|seckill",
  "seckill_edit|seckill",
  "seckill_detail|seckill",
  "seckill_goods_create|seckill",
  "seckill_goods_edit|seckill",
  "seckill_goods_list|seckill",
  "seckill_goods_detail|seckill",
  "seckill_goods_put_away|seckill",
  "seckill_delete|seckill",


  // 登录相关
  "authorization",
  "login_by_open_id",
  "login_by_open_id",
  "wei_xin_check_login",
  "tms_login",
  // 客户相关
  "member_referrer_list|member",
  "member_detail|member",
  "member_dealer_log|member",
  "member_edit|member",
  // 发现相关
  "case_class_list|cases",
  "find_cases_list|cases",
  "auth_cases_like|cases",
  "auth_case_comment|cases",
  "cases_comment_list|cases",
  // 案例相关
  "cases_create|cases",
  "cases_list|cases",
  "cases_detail|cases",
  "cases_edit|cases",
  "cases_change|cases",
  // 板川商品
  "factory_basic_goods_list|goods",
  "factory_basic_goods_putaway|goods",
  "factory_goods_detail|goods",
  "factory_basic_goods_price_update|goods",
  // 订单
  "order_list|order",
  // 企业管理
  "h5_this_auth_list|factory",
  "h5_auth_detail|factory",
  "group_list|factory",
  "h5_auth_edit|factory",
  // 自营商品
  "h5_use_class_list|goods",
  "factory_store_goods_list|goods",
  "store_goods_create|goods",
  "goods_store_edit|goods",
  "factory_store_goods_putaway|goods",
  "cascader_cache_class_list|goods",
  // 预付订单
  "prepay_order_list|order",
  // my页
  "promotion_goods|goods",
  "auth_account|factory",
  "auth_account_detail|factory",
  "auth_estimate_detail|factory",
  "auth_factory_code|factory",
  "auth_factory_card|factory",
  "factory_balance|factory",
  // 营业额
  "factory_finance|factory",
  // 售后管理
  "tms_order_refund_list|order",
  "order_refund_check|order",

  // 聊天相关
  "auth_friend_list|factory",
  "auth_friend_log|factory",
  "auth_friend_log_create|factory",
  "auth_friend_red|factory",

  // 其他
  "auth_change_status|factory",
  "factory_withdraw|factory",
  "send_phone_message|factory",
  "bind_shop|factory",
  "tms_auth_rule|factory",
  "card_detail|card",
  "card_edit|card",
]

// 调用方法: api["class_create|integral"]
let apiList2 = [
  // 积分商城 分类
  "class_create|integral",
  "class_edit|integral",
  "class_delete|integral",
  "class_list|integral",
]

apiList.forEach(element => {
  let name = element.split('|')[0]
  api[name] = function name(data) {
    return request({
      url: '',
      method: 'post',
      data: {
        "apiName": element,
        ...data
      }
    })
  }
});

apiList2.forEach(element => {
  let name = element
  api[name] = function name(data) {
    return request({
      url: '',
      method: 'post',
      data: {
        "apiName": element,
        ...data
      }
    })
  }
});
export default api