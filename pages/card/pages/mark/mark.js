import store from './store'
import busService from '../../service/busService'
// import config from '/pages/card/util/config';
// import CardAuthFailCode from '/pages/card/util/CardAuthFailCode';
//import { getCardInfo } from 'bus-tinyapp-components/es/utils'
import { rpcCardInfo } from '/pages/card/util/Utils'
import { jumpToBusCode } from 'bus-tinyapp-components/es/utils'
import {
  autoErrorPage,
  autoMiniErrorPage
} from '/pages/card/util/ErrorHandler'
const app = getApp()
// import Utils from '/pages/card/util/Utils';
const createPage = function (options) {
  return Page(store.register(options))
}
createPage({
  data: {
    showModal: false,
    isLoading: true,
    list: [],
    bg: {
      subway: '../../../../images/icon/subway.png',
      bus: '../../../../images/icon/bus.png'
    },
    list1: [{
      deadLine: "2019-05-21 00:00:00",
      lineCode: "01000000",
      lineName: "一号线",
      paymentAccount: "ZFB16a588e586911",
      stationCode: "01200000",
      stationName: "集美软件园",
      ticketType: null,
      recordType: '进站',
      transId: "2019051311575776000178458",
      transTime: "2019-05-09 12:36:56",
      transType: "出站",
      vehicleType: 'METRO'
    }],
    // , {
    //   deadLine: "2019-05-21 00:00:00",
    //   lineCode: "01000000",
    //   lineName: "一号线",
    //   paymentAccount: "ZFB16a588e586911",
    //   stationCode: "01200000",
    //   stationName: "测试",
    //   recordType: '出站',
    //   ticketType: '测试',
    //   transId: "2019051311575776000178458",
    //   transTime: "2019-05-09 12:36:56",
    //   transType: "进站",
    //   vehicleType: null
    // // }, {
    // //   deadLine: "2019-05-21 00:00:00",
    // //   lineCode: "01000000",
    // //   lineName: "一号线",
    // //   paymentAccount: "ZFB16a588e586911",
    // //   stationCode: "01200000",
    // //   stationName: "哈哈哈哈",
    // //   ticketType: null,
    // //   recordType: '进站',
    // //   transId: "2019051311575776000178458",
    // //   transTime: "2019-05-09 12:36:56",
    // //   transType: "出站",
    // //   vehicleType: null
    // }, {
    //   deadLine: "2019-05-21 00:00:00",
    //   lineCode: "01000000",
    //   lineName: "一号线",
    //   paymentAccount: "ZFB16a588e586911",
    //   stationCode: "01200000",
    //   stationName: "哈哈哈哈",
    //   ticketType: null,
    //   recordType: '出站',
    //   transId: "2019051311575776000178458",
    //   transTime: "2019-05-09 12:36:56",
    //   transType: "进站",
    //   vehicleType: null
    // }],
    activeTab: 0,
    h: 0,
    w: 0,
    scrollTop: 20,
    scrollHeight: 0,
    loginName: '',
    config: {
      metroSingleEntryTip: '该次行程因故缺失进站信息，需要您人工登记',
      metroSingleExitTip: '该次行程因故缺失出站信息，需要您人工登记',
      metroNoSingleTip: '如有异常行程发生，会通过系统消息通知您'
    },
    cardNo: ''
  },
  async onLoad() {
    // app.Tracker.Page.init()
    // my.showLoading()
    // await new Promise((resolve) => setTimeout(resolve, 50))
    // const app = getApp()
    // let card, param
    // if (this.data.$global && this.data.$global.cardInfo) {
    //   card = this.data.$global.cardInfo.cardModels[0].cardNo
    // } else {
    //   card = ''
    // }
    // let cardNo = app.options && app.options.cardNo ? app.options.cardNo : card
    // let flag = app.options && app.options.cardNo ? true : false
    // console.log(!this.data.$global.cardInfo && !flag)
    // if (!this.data.$global.cardInfo && !flag) {
    //   const extJson = await my.getExtConfigSync()
    //   console.log('没传卡号', extJson)
    //   try {
    //     getCardInfo(extJson.cityInfo.cardType).then(cardInfo => {
    //       console.log('获取卡号信息', cardInfo.cardModels[0].cardNo)
    //       app.getUserInfo(['auth_base']).then(({ authCode }) => {
    //         console.log('用户登录', authCode)
    //         busService.doLogin(authCode).then(async ({ data }) => {
    //           console.log('登录情况', data)
    //           busService.setCToken(data.ctoken)
    //           this.showHandleModal(data)
    //           app.isNewUser = false
    //           this.queryIrregularTrans({ cardNo: cardInfo.cardModels[0].cardNo })
    //           busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
    //             console.log('城市配置信息: ', data)
    //             app.config = data
    //             this.setData({
    //               config: data,
    //               bg: {
    //                 subway: data.singleMetroImg,
    //                 bus: data.singleBrtImg
    //               }
    //             })
    //           }))
    //         }).catch(() => {
    //           my.hideLoading()
    //           autoMiniErrorPage()
    //         })
    //       })
    //     })
    //   } catch (err) {
    //     console.log('方法出错', err)
    //   }
    // } else {
    //   console.log('onLoad卡号', cardNo, app.options)
    //   if (app.options && app.options.reqSeqNo) {
    //     param = {
    //       cardNo: cardNo,
    //       transId: app.options.reqSeqNo
    //     }
    //   } else {
    //     param = { cardNo: cardNo }
    //   }
    //   console.log('busService.host', busService.host)
    //   if (!busService.host) {
    //     const extJson = await my.getExtConfigSync()
    //     // console.log('初始化开始', extJson.cityInfo)
    //     busService.init(app.host, extJson.cityInfo.cityCode, extJson.cityInfo.appid, '', {
    //       app: 'alipay_mini',
    //       model: app.systemInfo.model || '',
    //       platform: app.systemInfo.platform || ''
    //     })
    //     // console.log('初始化成功')
    //     app.getUserInfo(['auth_base']).then(({ authCode }) => {
    //       console.log('用户登录', authCode)
    //       busService.doLogin(authCode).then(async ({ data }) => {
    //         console.log('登录情况', data)
    //         busService.setCToken(data.ctoken)
    //         this.showHandleModal(data)
    //         app.isNewUser = false
    //         this.queryIrregularTrans(param)
    //         busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
    //           console.log('城市配置信息: ', data)
    //           app.config = data
    //           this.setData({
    //             config: data,
    //             bg: {
    //               subway: data.singleMetroImg,
    //               bus: data.singleBrtImg
    //             }
    //           })
    //         }))
    //       }).catch(() => {
    //         my.hideLoading()
    //         autoMiniErrorPage()
    //       })
    //     })
    //   } else {
    //     app.getUserInfo(['auth_base']).then(({ authCode }) => {
    //       console.log('用户登录', authCode)
    //       busService.doLogin(authCode).then(async ({ data }) => {
    //         console.log('登录情况', data)
    //         busService.setCToken(data.ctoken)
    //         app.isNewUser = false
    //         this.showHandleModal(data)
    //         this.queryIrregularTrans(param)
    //         busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
    //           console.log('城市配置信息: ', data)
    //           app.config = data
    //           this.setData({
    //             config: data,
    //             bg: {
    //               subway: data.singleMetroImg,
    //               bus: data.singleBrtImg
    //             }
    //           })
    //         }))
    //       }).catch(() => {
    //         my.hideLoading()
    //         autoMiniErrorPage()
    //       })
    //     })
    //   }
    // }
    // app.Tracker.Page.init()
  },
  handleConfirm() {
    my.redirectTo({ url: '/pages/index/index' })
  },
  showHandleModal(data) {
    try {
      const app = getApp()
      console.log('showHandleModal', app.options, data.userId)
      if (app.options && app.options.userId !== data.userId) {
        this.setData({
          showModal: true
        })
        app.options.userId = data.userId
      } else {
        this.setData({
          showModal: false
        })
      }
    } catch (err) {
      console.log('userId有问题', err)
      this.setData({
        showModal: false
      })
    }
  },
  queryIrregularTrans(param) {
    this.setData({
      cardNo: param.cardNo
    })
    const app = getApp()
    busService.queryIrregularTrans(param).then(autoErrorPage(({ data }) => {
      console.log('获取异常', data, data.length)
      // data = []
      if (data.length) {
        console.log('获取异常行程', data)
        this.setData({
          isLoading: false,
          list: data,
          h: app.systemInfo.windowHeight - 150,
          w: app.systemInfo.windowWidth,
          loginName: (data && data[0].recordType === '进站') ? '登记进站' : '登记出站'
        })
      } else {
        // console.log('获取异常行程空', this.data.list.length)
        this.setData({
          isLoading: false,
          list: data,
          h: app.systemInfo.windowHeight - 150,
          w: app.systemInfo.windowWidth
        })
      }
      my.hideLoading()
    })).catch(() => {
      this.setData({
        isLoading: false,
        list: null,
        h: app.systemInfo.windowHeight - 150,
      })
      // autoMiniErrorPage()
    })
  },
  async onShow() {
    my.showLoading()
    await new Promise((resolve) => setTimeout(resolve, 50))
    const app = getApp()
    let card, param
    if (this.data.$global && this.data.$global.cardInfo && this.data.$global.cardInfo.cardModels && this.data.$global.cardInfo.cardModels.length) {
      card = this.data.$global.cardInfo.cardModels[0].cardNo
    } else {
      card = ''
    }
    let cardNo = app.options && app.options.cardNo ? app.options.cardNo : card
    let flag = app.options && app.options.cardNo ? true : false
    console.log(!this.data.$global.cardInfo && !flag)
    const extJson = await my.getExtConfigSync()
    if (!this.data.$global.cardInfo && !flag) {
      console.log('没传卡号', extJson)
      try {
        rpcCardInfo(extJson.cityInfo.cardType).then(cardInfo => {
          console.log('获取卡号信息', cardInfo.cardModels)

          if (cardInfo.cardModels.length === 0) {
            let cardTitle = cardInfo.cardTitle || '虚拟卡'
            my.confirm({
              title: '温馨提示',
              content: `未申领${cardTitle}，跳转领卡页面领卡`,
              confirmButtonText: '马上领卡',
              cancelButtonText: '暂不需要',
              success: (result) => {
                if (result.confirm) {
                  //let applyUrl = cardInfo.extInfo.cardApplyUrl
                  jumpToBusCode(extJson.cityInfo.cardType)
                }
                my.redirectTo({url:"/pages/index/index"})
              },
            })


            return
          }

          app.getUserInfo(['auth_base']).then(({ authCode }) => {
            console.log('用户登录', authCode)
            busService.doLogin(authCode).then(async ({ data }) => {
              console.log('登录情况', data)
              busService.setCToken(data.ctoken)
              this.showHandleModal(data)
              app.isNewUser = false
              this.queryIrregularTrans({ cardNo: cardInfo.cardModels[0].cardNo })
              busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
                console.log('城市配置信息: ', data)
                app.config = data
                this.setData({
                  config: data,
                  bg: {
                    subway: data.singleMetroImg,
                    bus: data.singleBrtImg
                  }
                })
              }))
            }).catch(() => {
              my.hideLoading()
              autoMiniErrorPage()
              this.setData({
                isLoading: false,
                list: [],
                h: app.systemInfo.windowHeight - 150,
                w: app.systemInfo.windowWidth
              })
            })
          })
        }).catch((err) => {
          console.log('catch', err)
          my.hideLoading()
          autoMiniErrorPage()
          this.setData({
            isLoading: false,
            list: [],
            h: app.systemInfo.windowHeight - 150,
            w: app.systemInfo.windowWidth
          })
        })
      } catch (err) {
        console.log('方法出错', err)
      }
    } else {
      console.log('onLoad卡号', cardNo, app.options)

      if (!cardNo) {
        let cardTitle = this.data.$global.cardInfo.cardTitle || '虚拟卡'
        my.confirm({
          title: '温馨提示',
          content: `未申领${cardTitle}，跳转领卡页面领卡`,
          confirmButtonText: '马上领卡',
          cancelButtonText: '暂不需要',
          success: (result) => {
            if (result.confirm) {
              //let applyUrl = cardInfo.extInfo.cardApplyUrl
              jumpToBusCode(extJson.cityInfo.cardType)
            }
            my.navigateBack();
          },
        })


        return
      }

      if (app.options && app.options.reqSeqNo) {
        param = {
          cardNo: cardNo,
          transId: app.options.reqSeqNo
        }
      } else {
        param = { cardNo: cardNo }
      }
      console.log('busService.host', busService.host)
      if (!busService.host) {
        const extJson = await my.getExtConfigSync()
        // console.log('初始化开始', extJson.cityInfo)
        busService.init(app.host, extJson.cityInfo.cityCode, extJson.cityInfo.appid, '', {
          app: 'alipay_mini',
          model: app.systemInfo.model || '',
          platform: app.systemInfo.platform || ''
        })
        // console.log('初始化成功')
        app.getUserInfo(['auth_base']).then(({ authCode }) => {
          console.log('用户登录', authCode)
          busService.doLogin(authCode).then(async ({ data }) => {
            console.log('登录情况', data)
            busService.setCToken(data.ctoken)
            this.showHandleModal(data)
            app.isNewUser = false
            this.queryIrregularTrans(param)
            busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
              console.log('城市配置信息: ', data)
              app.config = data
              this.setData({
                config: data,
                bg: {
                  subway: data.singleMetroImg,
                  bus: data.singleBrtImg
                }
              })
            }))
          }).catch(() => {
            my.hideLoading()
            autoMiniErrorPage()
          })
        })
      } else {
        app.getUserInfo(['auth_base']).then(({ authCode }) => {
          console.log('用户登录', authCode)
          busService.doLogin(authCode).then(async ({ data }) => {
            console.log('登录情况', data)
            busService.setCToken(data.ctoken)
            app.isNewUser = false
            this.showHandleModal(data)
            this.queryIrregularTrans(param)
            busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
              console.log('城市配置信息: ', data)
              app.config = data
              this.setData({
                config: data,
                bg: {
                  subway: data.singleMetroImg,
                  bus: data.singleBrtImg
                }
              })
            }))
          }).catch(() => {
            my.hideLoading()
            autoMiniErrorPage()
          })
        })
      }
    }

    // my.showLoading()
    // await new Promise((resolve) => setTimeout(resolve, 60))
    // const app = getApp()
    // console.log('onshow', busService.ctoken && !app.isNewUser)
    // if (busService.ctoken && !app.isNewUser) {
    //   let card, param
    //   if (this.data.$global && this.data.$global.cardInfo) {
    //     card = this.data.$global.cardInfo.cardModels[0].cardNo
    //   } else {
    //     card = ''
    //   }
    //   let cardNo = app.options && app.options.cardNo ? app.options.cardNo : card
    //   if (this.data.cardNo) {
    //     cardNo = this.data.cardNo
    //   }
    //   // console.log('卡号', cardNo)
    //   if (app.options && app.options.reqSeqNo) {
    //     param = {
    //       cardNo: cardNo,
    //       transId: app.options.reqSeqNo
    //     }
    //   } else {
    //     param = { cardNo: cardNo }
    //   }
    //   // app.getUserInfo(['auth_base']).then(({ authCode }) => {
    //   //   console.log('用户登录', authCode)
    //   //   busService.doLogin(authCode).then(async ({ data }) => {
    //   //     console.log('登录情况', data)
    //   //     busService.setCToken(data.ctoken)
    //   //     app.isNewUser = false
    //   //     busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({ data }) => {
    //   //       console.log('城市配置信息: ', data)
    //   //       app.config = data
    //   //     }))
    //   // await new Promise((resolve) => setTimeout(resolve, 5))
    //   this.queryIrregularTrans(param)
    //   // my.hideLoading()
    //   //   }).catch(() => {
    //   //     my.hideLoading()
    //   //     autoMiniErrorPage()
    //   //   })
    //   // })
    // }
  },
  handleUper() {
    // if (this.data.activeTab === 0) {
    this.setData({
      scrollTop: 20,
      activeTab: 0,
      loginName: this.data.list[0].recordType === '进站' ? '登记进站' : '登记出站'
    })
    // }
  },
  handleLower(e) {
    console.log(e)
    // if (this.data.activeTab ===  this.data.list.length - 1) {
    this.setData({
      scrollTop: this.data.scrollHeight,
      activeTab: this.data.list.length - 1,
      loginName: this.data.list[this.data.list.length - 1].recordType === '进站' ? '登记进站' : '登记出站'
    })
    // }
  },
  handleSwiper(e) {
    this.setData({
      scrollHeight: e.detail.scrollHeight
    })
    let h = e.detail.scrollHeight / (this.data.list.length)
    console.log(this.data.scrollTop, e.detail.scrollTop, h * (this.data.activeTab + 1) * 0.8, h * (this.data.activeTab + 1))
    if (this.data.scrollTop < e.detail.scrollTop && (h * (this.data.activeTab + 1) * 0.9) <= e.detail.scrollTop && e.detail.scrollTop <= h * (this.data.activeTab + 1) * 0.95 && this.data.activeTab >= 0 && this.data.activeTab < this.data.list.length - 1) {
      this.setData({
        scrollTop: e.detail.scrollTop,
        activeTab: this.data.activeTab + 1,
        loginName: this.data.list[this.data.activeTab + 1].recordType === '进站' ? '登记进站' : '登记出站'
      })
      console.log(this.data.activeTab)
    } else if (this.data.scrollTop >= e.detail.scrollTop && h * (this.data.activeTab - 1) * 0.9 <= e.detail.scrollTop && e.detail.scrollTop <= h * (this.data.activeTab - 1) * 0.95 && this.data.activeTab > 0 && this.data.activeTab <= this.data.list.length - 1) {
      this.setData({
        scrollTop: e.detail.scrollTop,
        activeTab: this.data.activeTab - 1,
        loginName: this.data.list[this.data.activeTab - 1].recordType === '进站' ? '登记进站' : '登记出站'
      })
      console.log(this.data.activeTab)
    }
  },
  handleCouplesItem(e) {
    this.setData({
      activeTab: +e.target.dataset.index,
      loginName: this.data.list[+e.target.dataset.index].recordType === '进站' ? '登记进站' : '登记出站'
    })
  },
  // 多个异常行程
  handleLogin() {
    const app = getApp()
    //app.Tracker.click('点击补登')
    app.trans = this.data.list[this.data.activeTab]
    my.navigateTo({
      url: `/pages/card/pages/line/line?cardNo=${this.data.cardNo}&vehicle=${app.trans.vehicleType}`
    })
  },
  handleTab() {
    const app = getApp()
    const options = app.transRecord || {
      type: "alipay",
      url: "alipays://platformapi/startApp?appId=20000003&actionType=toBillList&returnHome=NO&extReq=%7B%22cardType%22%3A%20%22T0350200%22%7D&bizSubType=SUB_TYPE_75%2CSUB_TYPE_107&title=%E4%B9%98%E8%BD%A6%E8%AE%B0%E5%BD%95"
    }
    console.log(options)
    //app.Tracker.click('乘车记录')
    switch (options.type) {
      case 'self':
        my.navigateTo({
          url: options.url
        })
        break
      case 'alipay':
        console.log(options.url)
        my.ap.navigateToAlipayPage({
          path: options.url,
          fail: (err) => {
            console.log(err)
            // my.alert({
            //   content: JSON.stringify(err)
            // })
          }
        })
        break
      case 'miniapp':
        my.navigateToMiniProgram({
          appId: options.remarks,
          path: options.url,
          extraData: options.extraData
        })
        break
      case 'none':
      case '':
        break
      default:
        break
    }
  }
})
