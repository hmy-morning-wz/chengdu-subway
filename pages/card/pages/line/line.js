import busService from '../../service/busService'
import {
  autoErrorPage,
  autoMiniErrorPage
} from '/pages/card/util/ErrorHandler'

const app = getApp()

Page({
  data: {
    list: [],
    platformList: [],
    activeIndex: 0,
    activePlatform: -1,
    flag: true,
    showModal: false,
    trans: {},
    platform: {},
    cardNo: '',
    vehicle: ''
  },
  async onLoad(options) {
    console.log('options', options)
    this.setData({
      vehicle: options.vehicle,
      cardNo: options.cardNo
    })
    await new Promise((resolve) => setTimeout(resolve, 50))
    // app.trans = {
    //   deadLine: "2019-04-30 10:28:23",
    //   lineCode: "L1",
    //   lineName: "一号线",
    //   paymentAccount: "ZFB16a2f3a75ae11",
    //   stationCode: "S1",
    //   stationName: "集美大桥南站",
    //   ticketType: null,
    //   transId: "201904231028asdadad",
    //   transTime: "2019-04-23 10:28:23",
    //   transType: "进站",
    //   vehicleType: null
    // }
    // console.log('行程记录', app.trans)
    this.setData({
      trans: app.trans
    })
    if (app.trans.recordType === '进站') {
      my.setNavigationBar({
        title: '进站补登'
      })
    } else {
      my.setNavigationBar({
        title: '出站补登'
      })
    }
    if (!busService.host) {
      busService.init(app.host, app.cityInfo.cityCode, app.cityInfo.appid, '', {
        app: 'alipay_mini',
        model: app.systemInfo.model,
        platform: app.systemInfo.platform
      })
    }
    //app.Tracker.Page.init()
  },
  onShow() {
    busService.querySubwayLines({ vehicle: this.data.vehicle }).then(autoErrorPage(({ data }) => {
      console.log('地铁线路列表', data)
      //let {platformList} = this.data
      let platformList = []
      data.list.map(item => {
        platformList.push(item.stationList)
        return item
      })
      this.setData({
        list: data.list,
        platformList
      })
      // console.log(this)
    })).catch(err => {
      autoMiniErrorPage(err)
      this.setData({
        list: [],
        platformList: []
      })
    })
  },
  handleMenu(e) {
    console.log(e)
    this.setData({
      activeIndex: +e.currentTarget.dataset.index
    })
  },
  // 选择站点
  handleStation(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      activePlatform: +e.currentTarget.dataset.index,
      platform: e.currentTarget.dataset.obj
    })
    //app.Tracker.click(`选择站点 - ${e.currentTarget.dataset.obj.stationName}`)
  },
  // 补登
  handleLogin() {
    console.log('补登')
    let {activePlatform} = this.data
    if(activePlatform>=0) {
      this.setData({
      showModal: true
     })
    }
   
    //app.Tracker.click('点击补登按钮')
  },
  handleCancel() {
    console.log('取消补登')
    this.setData({
      showModal: false
    })
    //app.Tracker.click('取消补登')
  },
  handleConfirm() {
    console.log('确认补登')
    //app.Tracker.click('确认补登')
    if (this.data.flag) {
      this.setData({
        flag: false
      })
      let {activeIndex,list} = this.data
      let line = list[activeIndex]
      busService.mileage({
        cardNo: this.data.cardNo,
        transId: this.data.trans.transId,
        lineCode: this.data.trans.lineCode || line.lineCode,
        lineName: this.data.trans.lineName,
        stationCode: this.data.platform.stationCode,
        stationName: this.data.platform.stationName
      }).then((data) => {
        console.log(data)
        this.setData({
          showModal: false,
          flag: true
        })
        if (data.code !== 200) {
          my.navigateTo({
            url: `/pages/card/pages/milestatus/milestatus?type=fail&msg=${data.msg}`
          })
        } else {
          my.navigateTo({
            url: '/pages/card/pages/milestatus/milestatus?type=success'
          })
        }
      }).catch(() => {
        my.navigateTo({
          url: '/pages/card/pages/milestatus/milestatus?type=fail'
        })
      })
    }
  }
})
