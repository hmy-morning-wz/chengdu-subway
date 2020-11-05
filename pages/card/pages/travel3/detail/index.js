import TravelStatus from '/pages/card/util/TravelStatus';
import busService from '/pages/card/service/busService';
const app = getApp();
const mockData = {"code":200,"msg":"SUCCESS","redirectUrl":null,"data":{"bizNo":"B77798DA26F14021ABAD22EFEF3C7D75","orderId":"20201019125318666","orderDetail":{"vehicleType":"bus","headOne":"其他","headTwo":"0.01","headTwoColor":"#000000","headThree":"已完成","lineList":[{"key":"付款方式","value":"支付宝支付","sort":0},{"key":"票价金额","value":"¥0.01","sort":1},{"key":"乘车线路","value":"有轨电车蓉2号线","sort":2},{"key":"乘车时间","value":"2020-10-19 12:53:18","sort":3},{"key":"扣款时间","value":"2020-10-19 12:53:19","sort":4},{"key":"订单编号","value":"20201019125318666","sort":5},{"key":"订单类型","value":"乘车扣费","sort":6}]}}}
Page({
  data: {
    info: null,
    iconUrl: null,
  },
  onLoad(query) {
        console.log(app.config);
   // const info1 = app.item;    
    //info1.status = TravelStatus.toName(info1.status);
    this.setData({ iconUrl : app.config &&  app.config.city && app.config.city.iconUrl });
    //getTravelDetail({cityCode, cadNo, orderId})
    let {orderId,cityCode,cardNo} = query
      busService.getMetroTravelDetail({ cityCode,cardNo, orderId }).then((res)=>{
         //data = mockData
         let lineList =res && res.data && res.data.orderDetail &&  res.data.orderDetail.lineList.sort((a,b)=>{ return (a.sort||0)-(b.sort||0)})
         this.setData({info:res.data,lineList})
      })
  },

  onShow() {

  },

});
