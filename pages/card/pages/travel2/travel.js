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
const mockData = {
  "totalNum": 2, "currentPage": 1, "hasNextPage": false, "bizNo": "232142141241241", "list": [{
    "vehicleType": "bus", "lineName": "118", "date": "2020-07-09 12:00:00", "price": "3", "payMode": "支付宝", "payModeColor": "#108ee9",
    "orderId": "23423412312321321"
  }, { "vehicleType": "metro", "onStationName": "火车站", "offStationName": "人名广场", "date": "2020-07-09 12:00:00", "price": "3", "payMode": "支付宝", "payModeColor": "#108ee9", "orderId": "23423412312321321" }]
}
const createPage = function (options) {
  return Page(store.register(options))
}

createPage({
  data: {
    loading: true,
    list: [],
    month: "",
    startTime: "",
    endTime: "",
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    itemNum: 0,
    innerLoading: false,
    hasArrow: true
  },
  async onLoad() {
    await this.dispatch('$global:getCardInfo', getApp().cardType)
     if(busService.ctoken && app.config) { 
        this.setData({ctoken:busService.ctoken,userId:app.userId})
        let month = dayjs().format(MONTH_FORMAT)
        let d = Date.parse(month)
        let startTime = dayjs(d).format(DATE_FORMAT1)
        let endTime = dayjs(d).add(1, 'month').subtract(1, 'day').format(DATE_FORMAT2)
        this.setData({ month, startTime, endTime }, () => {
          setTimeout(() => {
            this.requestList(this.data.page, 0)
          }, 100)
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
        let month = dayjs().format(MONTH_FORMAT)
        let d = Date.parse(month)
        let startTime = dayjs(d).format(DATE_FORMAT1)
        let endTime = dayjs(d).add(1, 'month').subtract(1, 'day').format(DATE_FORMAT2)
        this.setData({ month, startTime, endTime }, () => {
          setTimeout(() => {
            this.requestList(this.data.page, 0)
          }, 100)
        })
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

  onReachBottom() {
    console.log('hashNextPage====>', this.data.hasNextPage);
    // 页面被拉到底部
    if (this.data.hasNextPage) {
      this.requestList(++this.data.page, 1);
    }
  },

  /** 下来刷新 重新加载数据 */
  onPullDownRefresh() {
    this.initData(moment().format(MONTH_FORMAT));
    this.requestList(this.data.page);
    my.stopPullDownRefresh();
  },

  onTravelDetail(e) {
    const index = e.index;
    const item = this.data.list[index];
    app.item = item;
    console.log('choose item===>', item);
    my.navigateTo({ url: '/pages/card/pages/traveldetail2/traveldetail' });
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
          this.setData({ month, startTime, endTime, page: 1, list: [] })

          //this.setData({ month, page: 1 });
          this.initData(month);
          this.requestList(this.data.page);
        }
      },
    });
  },


  initData(month) {
    this.setData({
      list: [], month, page: 1, hasNextPage: true, innerLoading: false,
    });
  },

  /** flag 0 create 1 reachbottom */
  async requestList(page, flag) {
    if (flag !== 0) {
      //  my.showLoading({content: '查询中...'});
      this.setData({ innerLoading: true });
    } else {
      this.setData({ loading: false });
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

    busService.getTravelLog2({ currentPage: this.data.page, pageSize: this.data.pageSize, cityCode, cardNo, startTime, endTime }).then(autoErrorPage(({ data }) => {
      // my.hideLoading();
      this.setData({ innerLoading: false });
      //data = mockData
      console.log('getTravelLog====>', data);
      if (page === 1 && data && data.totalNum === 0) {
        this.setData({ hasNextPage: false, itemNum: 0 });
        return;
      }
      if (flag === 1 && (data === undefined || data.totalNum === 0)) {
        --this.data.page;
        this.setData({ hasNextPage: false });
        my.showToast({
          content: '已经到底了', // 文字内容
        });
        return;
      }
      let { list } = this.data;
      // 转换列表中金额分为元
      /*for (let i = 0; i < list.length; i += 1) {
        list[i].amount = list.formatRMBYuanDecimal(list[i].price);
      }*/
      let l = data.list.map((t) => {
        let { date: gmtBizTime, price: amount, orderId, payModeColor, vehicleType, lineName, payMode ,onStationName,offStationName,} = t
        return { gmtBizTime, cardNo, cityCode, amount:typeof amount =='number'? Utils.formatRMBYuanDecimal(amount):amount, orderId, payModeColor, vehicleType, 
        lineName:vehicleType=="metro"?`${onStationName||'-'} 至 ${offStationName||'-'}`:lineName
        , payMode }
      })
      if (list) {
        list = [...list, ...l]
      }
      else {
        list = l
      }
      /*
            if (page === undefined || page === 1) {
              list = data;
            } else {
              list.push(...data);
            }*/

      this.setData({ list, loading: false, itemNum: this.data.itemNum + list.length });
    }), autoMiniErrorPage());
  },
});
