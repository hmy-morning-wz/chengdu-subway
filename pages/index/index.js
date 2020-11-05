import store from './store'
// import CONFIG from '../../util/config'

const createPage = function (options) {
  return Page(store.register(options))
}

const app = getApp()

createPage({
  data: {
    bannerSize: {},
    tradeNO: null,
    cityInfo: null
  },
  async onLoad() {
    const extJson = my.getExtConfigSync()
    console.log('小程序配置信息', extJson.cityInfo)
    this.setData({
      cityInfo: extJson.cityInfo
    })
    // console.log('cityInfo:', this, getApp().cityInfo)
    this.dispatch('$global:getCardInfo', extJson.cityInfo.cardType)
    this.dispatch('$global:updateSystemInfo')
    await this.dispatch('getIconList', extJson.cityInfo) // 获取首页配置列表
    console.log(this.data.iconList)
    this.setInitConfig()
   // app.Tracker.Page.init()
    app.transRecord = this.data.iconList[0]
  },
  async setInitConfig() {
    console.log('当前城市', this.data.cityInfo)
    my.setNavigationBar({
      title: this.data.cityInfo.title
    })
    this.setData({
      bannerSize: {
        w: this.data.$global.systemInfo.windowWidth * 0.9,
        h: this.data.$global.systemInfo.windowWidth * 0.9 / 3.43
      }
    })
  },
  async onShow() {
    // console.log(this.data.cityInfo)
    const extJson = my.getExtConfigSync()
    this.dispatch('$global:getCardInfo', extJson.cityInfo.cardType)
  },
  onReady() {},
  onItemClick(e) {
    const {
      index
    } = e.detail
    //app.Tracker.click(this.data.iconList[index].text)
    console.log(this.data.iconList[index])
    this.handleNavigate(this.data.iconList[index])
    // 跳转到支付宝
    // my.ap.navigateToAlipayPage({path: this.data.iconList[index].url})
  },
  handleNavigate(options) {
    switch (options.type) {
      case 'self':
        my.navigateTo({
          url: options.url
        })
        break
      case 'alipay':
        // my.alert({
        //   content: options.url
        // })
        console.log(options.url)
        my.ap.navigateToAlipayPage({
          path: options.url,
          fail: (err) => {
            my.alert({
              content: JSON.stringify(err)
            })
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
  },
  // 监听
  handleClick(e) {
    console.log('点击绿色生活', e.currentTarget.dataset)
    //app.Tracker.click(e.currentTarget.dataset.obj.text)
    this.handleNavigate(e.currentTarget.dataset.obj)
  }
});