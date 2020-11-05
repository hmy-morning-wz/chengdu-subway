import Store from './store'
import getDomain from '/util/env'
import busService from '/pages/card/service/busService'
import '@tklc/miniapp-tracker-sdk'
const extJson = my.getExtConfigSync()
App(
  Store({
    mtrConfig:{
        appId: extJson.cityInfo.appId,// 区别不同小程序，可用小程序自己的appId
        server:extJson.mtrUrl,// ['https://webtrack.allcitygo.com:8088/event/upload'], subway don`t use it
        version: '1.0.1',     
        appName: extJson.cityInfo.title,
        mtrDebug: true
    },
    isNewUser: true,
    redirectPage: null,
    config: {},
    cardInfo: {},
    cityInfo: null, // 城市配置
    cardType: '',
    host: '',
    systemInfo: {},
    transRecord: {},
    options: {},
    trans: {}, // 当前异常行程
    async onLaunch(options) {
      console.log('配置信息', options)      
      this.options = options.query
      this.busServiceInit(options)
    },

    async busServiceInit(options) {
    
      console.log('小程序配置信息', extJson)
      this.cityInfo = extJson.cityInfo
      this.cardType = this.cityInfo.cardType
      this.extJson = extJson
      console.log('城市的配置信息', this.cityInfo)

      this.systemInfo = my.getSystemInfoSync()
      // console.log('Launch options: ', options, ' || system info: ', this.systemInfo)
      console.log('系统信息', this.systemInfo)
      // this.dispatch('$global:updateSystemInfo')

      const { query } = options
      this.cityCode = (query && query.city) || this.cityInfo.cityCode

      const host = getDomain()

      this.host = (query && query.host) || host
      const si = {
        app: 'alipay_mini',
        model: this.systemInfo.model,
        platform: this.systemInfo.platform
      }
      busService.init(host, this.cityInfo.cityCode, this.cityInfo.appid, '', si)
      

    this.getUserInfo(['auth_base']).then(({ authCode }) => {    
      return busService.doLogin(authCode)
    }).then((({ data }) => {
      console.log('下一步', data)  
      if(data) {  
      busService.setCToken(data.ctoken)
      this.userId = data.userId
      busService.getConfig('ioc.ebuscard.city.config').then(({ data }) => {
        console.log('>>> 城市配置信息: ', data)
        this.config = data
      })
    }
    }))
  
    },
    getUserInfo(scopes) {
      return new Promise((resolve, reject) => {
        my.getAuthCode({
          scopes,
          success: (info) => {
            console.log('获取用户信息', scopes, info)
            resolve(info)
          },
          fail: (error) => {
            reject(error)
          }
        })
      })
    }
  })
)
