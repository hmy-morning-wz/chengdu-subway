import busService from '/pages/card/service/busService'
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler'
Page({
  data: {},
  onLoad(opt) {
    my.showLoading()
    const app = getApp()
    console.log('opt', opt)
    if (opt) app.redirectPage = opt.redirectPage
    app.getUserInfo(['auth_base']).then(({authCode}) => {
      console.log('app配置', app.redirectPage)         
      return busService.doLogin(authCode)
    }).then(autoErrorPage(({ data }) => {
      console.log('下一步', data)
      busService.setCToken(data.ctoken)
      app.isNewUser = false // data.newUser
      busService.getConfig('ioc.ebuscard.city.config').then(autoErrorPage(({data}) => {
          console.log('>>> 城市配置信息: ', data)
          app.config = data
          my.hideLoading()
          if (app.isNewUser) {
            my.redirectTo({ url: '/pages/card/pages/guide/guide' })
          } else {
            if (app.redirectPage) {
              const redirect = app.redirectPage
              app.redirectPage = null
              my.redirectTo({ url: redirect })
            } else {
              my.redirectTo({ url: '/pages/card/pages/main/main' })
            }
          }
      }))
    })).catch(() => {
      my.hideLoading()
      autoMiniErrorPage()
    })
    //app.Tracker.Page.init()
  }
})
