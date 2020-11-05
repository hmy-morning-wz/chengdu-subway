import TravelStatus from '/pages/card/util/TravelStatus';
import busService from '/pages/card/service/busService';
const app = getApp();
const mockData = {
  "bizNo": "232142141241241",
  "orderId": "23423412312321321",
  "orderDetail": {
    "vehicleType": "bus",
    "headOne": "标题1",
    "headTwo": "标题2",
    "headTwoColor": "#108ee9",
    "headThree": "标题3",
    "lineList":
      [{
        "key": "key1", "value": "val1",
        "sort": 0
      },
      { "key": "key2", "value": "val2", "sort": 1 },
      { "key": "key3", "value": "val3", "sort": 2 }]
  }
}
Page({
  data: {
    info: null,
    iconUrl: null,
  },
  onLoad() {
        console.log(app.config);
    const info1 = app.item;    
    info1.status = TravelStatus.toName(info1.status);
    this.setData({ info1, iconUrl:app.config &&  app.config.city && app.config.city.iconUrl });
    //getTravelDetail({cityCode, cadNo, orderId})
    let {orderId,cityCode,cardNo} = info1
      busService.getTravelDetail({ cityCode,cardNo, orderId }).then((res)=>{
         //data = mockData
         let lineList = res.data.orderDetail.lineList.sort((a,b)=>{ return (a.sort||0)-(b.sort||0)})
         this.setData({info:res.data,lineList})
      })
  },

  onShow() {

  },

});
