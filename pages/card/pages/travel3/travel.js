import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
import dayjs from 'dayjs';
import Utils from '/pages/card/util/Utils';
import moment from 'moment';
import store from './store';
const MONTH_FORMAT = 'YYYY-MM';
const DATE_FORMAT1 = 'YYYY-MM-DD 00:00:00';
const DATE_FORMAT2 = 'YYYY-MM-DD 23:59:59';
const app = getApp();
const mockData1 = {"code":200,"msg":"SUCCESS","redirectUrl":null,"data":{"totalNum":3,"currentPage":1,"hasNextPage":false,"bizNo":"789BDFC9F331496B9501C8DA3B32D1CE","pendingData":[{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 16:49:19","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019164919934","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 16:39:12","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163912845","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 16:38:51","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163851691","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 16:38:27","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163827292","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 16:38:08","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163808361","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 16:37:48","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163749059","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 16:37:05","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163705058","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"","offStationName":"茶店子客运站","date":"2020-10-19 16:36:32","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019163632603","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"","offStationName":"茶店子客运站","date":"2020-10-19 15:57:06","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155706403","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 15:57:01","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155701267","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 15:56:48","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155648665","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 15:56:20","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155620897","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"","offStationName":"茶店子客运站","date":"2020-10-19 15:56:12","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155612301","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 15:56:02","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019155602760","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 14:38:31","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019143831517","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"","offStationName":"茶店子客运站","date":"2020-10-19 13:43:39","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019134339751","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 11:40:40","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019114040448","canJump":"0","jumpUrl":null,"statusDesc":"行程中"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 11:40:22","price":null,"payMode":null,"payModeColor":null,"orderId":"CS10020201019114022553","canJump":"0","jumpUrl":null,"statusDesc":"行程中"}],"finishData":[{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"","date":"2020-10-19 14:39:14","price":"¥0.02","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019143914375","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"metro","lineName":null,"onStationName":"","offStationName":"茶店子客运站","date":"2020-10-19 14:26:07","price":"¥0.02","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019142607890","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"metro","lineName":null,"onStationName":"清江西路","offStationName":"省体育馆","date":"2020-10-19 11:29:42","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019112942253","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"}]}}
const mockData2 = {"code":200,"msg":"SUCCESS","redirectUrl":null,"data":{"totalNum":22,"currentPage":1,"hasNextPage":true,"bizNo":"CC507DA8175142D993940FCAF65F0DC3","pendingData":null,"finishData":[{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:12:48","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019161248515","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:49","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160249688","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:45","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160245227","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:42","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160242840","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:28","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160228876","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:25","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160225202","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:15","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160215829","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:02:08","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160208321","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:01:54","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160154380","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"},{"vehicleType":"bus","lineName":"有轨电车蓉2号线","onStationName":null,"offStationName":null,"date":"2020-10-19 16:01:49","price":"¥0.01","payMode":"支付宝支付","payModeColor":"#000000","orderId":"20201019160149621","canJump":"1","jumpUrl":"detail","statusDesc":"已完成"}]}}

const createPage = function (options) {
  return Page(store.register(options))
}
const pageSize = 10
createPage({
  data: {
    loading: true,
     tabs2: [
      {
        title: '地铁',       
      },
      {
        title: '公交',        
      }   
    ],
    listPageData:{},
    tabContentHeight:'100vh',
    activeTab2: 0,
    list: [],
    month: "",
    startTime: "",
    endTime: "",
    page: 1,
    pageSize: pageSize,
    hasNextPage: true,
    metroItemNum1:0,
    metroItemNum2:0,
    itemNum: 0,
    innerLoading: false,
    hasArrow: true
  },
  async onLoad() {
    await this.dispatch('$global:getCardInfo', getApp().cardType)
 
    my.getSystemInfo({success:(res)=>{
      let windowHeight = /*(res.screen && res.screen.height) ||*/  res.windowHeight
      let tabContentHeight = windowHeight  - 44 -res.titleBarHeight  - res.statusBarHeight
      //this.setData({systemInfo:res,tabContentHeight:`${tabContentHeight}`})
    }});
    let month = dayjs().format(MONTH_FORMAT)
        let d = Date.parse(month)
        let startTime = dayjs(d).format(DATE_FORMAT1)
        let endTime = dayjs(d).add(1, 'month').subtract(1, 'day').format(DATE_FORMAT2)
        this.setData({ month, startTime, endTime }, () => {
        
        })
    if(busService.ctoken && app.config) { //
      this.setData({ctoken:busService.ctoken},()=>{
         this.requestList(1, 0) 
      })     
    }else {
     my.showLoading()
    app.getUserInfo(['auth_base']).then(({ authCode }) => {
      console.log('app配置', app.redirectPage)
      return busService.doLogin(authCode)
    }).then(autoErrorPage(({ data }) => {
      console.log('下一步', data)
      this.setData({...data})
      busService.setCToken(data.ctoken)
      busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
        console.log('>>> 城市配置信息: ', data)
        app.config = data
        my.hideLoading()
        this.requestList(1, 0) 
      }))
    })).catch(() => {
      my.hideLoading()
      autoMiniErrorPage()
    })
  }



  },

  onShow() {
    /*
    if (busService.config) {
      this.requestList(this.data.page, 0)
    } else {
      let time = 30
      let set = setInterval(() => {
          time--
          if (time === 0 || busService.config) {
            clearInterval(set)
            this.requestList(this.data.page, 0)
          }
      }, 100)
    }*/
  },
  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
    this.requestList(1, 1);
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
    this.requestList(1, 1);
  },
  onBottomLoad() {
      console.log('onBottomLoad hashNextPage====>', this.data.hasNextPage);
    // 页面被拉到底部
    if (this.data.hasNextPage) {
      let {activeTab2,metroPageNum,page} = this.data
      this.requestList(1 + (activeTab2==0?metroPageNum:page), 1);
    }
  },
  onScrollToLower(){
    console.log('onScrollToLower hashNextPage====>', this.data.hasNextPage);
    // 页面被拉到底部
    if (this.data.hasNextPage) {
      let {activeTab2,metroPageNum,page} = this.data
      this.requestList(1 + (activeTab2==0?metroPageNum:page), 1);
    }
  },
  onReachBottom() {
    console.log('onReachBottom hashNextPage====>', this.data.hasNextPage);
    // 页面被拉到底部
    if (this.data.hasNextPage) {
      let {activeTab2,metroPageNum,page} = this.data
      this.requestList(1 + (activeTab2==0?metroPageNum:page), 1);
    }
  },

  /** 下来刷新 重新加载数据 */
  onPullDownRefresh() {
    this.initData(moment().format(MONTH_FORMAT));
    this.requestList(1);
    my.stopPullDownRefresh();
  },

  onTravelDetail(e) {
    //"jumpUrl": "detail", // detail：详情页, retro：补登页
     
    const item =  e.currentTarget.dataset.obj;
    //const item = this.data.list[index];
    app.item = item;
    console.log('choose item===>', item);
    let  {canJump,jumpUrl,orderId,cityCode,cardNo} = item
    if(canJump==1) {
      if(jumpUrl=='detail') {
        //orderId,cityCode,cardNo
        
        my.navigateTo({ url: `./detail/index?orderId=${orderId}&cityCode=${cityCode}&cardNo=${cardNo}` });
      } else if(jumpUrl=='retro') {
        my.navigateTo({ url: '/pages/card/pages/mark/mark' });
      }
    }
  },


  chooseMonth() {
    const startDate = dayjs().subtract(1, 'years').format(MONTH_FORMAT);
    const endDate = dayjs().format(MONTH_FORMAT);
    const currentDate = dayjs().format(MONTH_FORMAT);

    my.datePicker({
      format: 'yyyy-MM',
      startDate,
      endDate,
      currentDate,
      success: (res) => {
        const month = dayjs(res.date).format(MONTH_FORMAT);
        console.log('》》》》choose month', month);
        if (this.data.month !== month) {
          let d = Date.parse(month)
          let startTime = dayjs(d).format(DATE_FORMAT1)
          let endTime = dayjs(d).add(1, 'month').subtract(1, 'day').format(DATE_FORMAT2)
          this.setData({ month, startTime, endTime})

          //this.setData({ month, page: 1 });
          this.initData(month);          
          this.requestList(1);
        }
      },
    });
  },


  initData(month) {
    this.setData({
      list: [], month,  hasNextPage: true, innerLoading: false,
      page:1, metroPageNum: 1,metroItemNum1:0,metroItemNum2:0,metroPageData:{},metroList1:[],metroList2:[], listPageData: {}
    });
  },

  /** flag 0 create 1 reachbottom */
  async requestList(page, flag,vehicleType) {
    if(this.requestIng) {
      console.log("requestIng...")
      setTimeout(()=>{
        this.requestIng = false
      },3000)
      return
    }
    this.requestIng = true
    if(!vehicleType) { //'bus'//metro
       let { activeTab2 } = this.data
       if(activeTab2==0) {
         vehicleType = 'metro'
       }else {
         vehicleType = 'bus'
       }
    }
    
    //const month = dayjs(this.data.month).format(MONTH_FORMAT);
    let { startTime, endTime } = this.data
    let cityCode = getApp().cityCode
    let cardNo

    if (this.data.$global && this.data.$global.cardInfo && this.data.$global.cardInfo.cardModels && this.data.$global.cardInfo.cardModels.length) {
      cardNo = this.data.$global.cardInfo.cardModels[0].cardNo
    } else {
      cardNo = my.isIDE?this.data.userId: ""//'2088702372862094':""
    }
    this.setData({innerLoading:true})
   // let vehicleType = 'bus'//metro
//{cityCode,startTime,endTime,currentPage,pageSize,vehicleType}
    busService.getTradeList({ currentPage: page, pageSize, cityCode, cardNo, startTime, endTime,vehicleType:vehicleType }).then(autoErrorPage(({ data }) => {
      // my.hideLoading();     
      //data = mockData
      console.log('getTravelLog====>', data);
      let {hasNextPage,totalNum} = data
      this.setData({ hasNextPage});
      /*if (flag === 1 && (data === undefined || data.totalNum === 0)) {
        --this.data.page;
        this.setData({ hasNextPage: false });
        my.showToast({
          content: '已经到底了', // 文字内容
        });
        return;
      }*/
      //let { list,pendingData,finishData } = this.data;
       let { pendingData,finishData } = data;
      // 转换列表中金额分为元
      /*for (let i = 0; i < list.length; i += 1) {
        list[i].amount = list.formatRMBYuanDecimal(list[i].price);
      }*/
       if(pendingData) {  pendingData =pendingData.map((t) => {  
        return {...t, cardNo, cityCode } 
      }) }
      if(finishData) { finishData = finishData.map((t) => {      
        return {...t, cardNo, cityCode } 
      })}
      /*if (list) {
        list = [...list, ...l]
      }
      else {
        list = l
      }*/
      /*
            if (page === undefined || page === 1) {
              list = data;
            } else {
              list.push(...data);
            }*/
       if( vehicleType === 'bus') {
           let {list,listPageData} =this.data ;
            if(!listPageData) {
             listPageData = {}
           }
           listPageData[page] = finishData
           list = []
            for(let i=0;i<=page;i++) {
             if(listPageData[i]) { list = [...list,...listPageData[i]] }
           }
           let itemNum = list &&  list.length || 0
          this.setData({ 
            loading: false,innerLoading: false ,
            page,
            list, itemNum,
            listPageData,
            hasNextPage:itemNum<totalNum
          });
       } else  if( vehicleType === 'metro') {
           let {metroItemNum1,metroItemNum2,metroPageData,metroList1} =this.data ;
           //pendingData =metroItemNum1? [...metroItemNum1, ...pendingData]:pendingData;
           if(!metroPageData) {
             metroPageData = {}
           }
           metroPageData[page] = finishData
           finishData= []
           for(let i=0;i<=page;i++) {
             if(metroPageData[i]) { finishData = [...finishData,...metroPageData[i]] }
           }
            metroList1= page==1?pendingData:metroList1
            metroItemNum2=finishData && finishData.length || 0
           //metroItemNum2? [...metroItemNum2, ...finishData]:finishData;
           this.setData({  
             loading: false,innerLoading: false ,
             metroPageNum:page,
             metroPageData,
             //[`page.${page}`]:finishData,           
             metroList1,
             metroList2:finishData,                      
             metroItemNum1:metroList1 && metroList1.length || 0,
             metroItemNum2,
             hasNextPage:metroItemNum2<totalNum
            });
       }
        this.requestIng = false
      //this.setData({ list, metroList1:list.slice(0,1),metroList2:list,loading: false, itemNum: this.data.itemNum + list.length,metroItemNum1:list.length, metroItemNum2:list.length});
    }), autoMiniErrorPage());
  },
});
