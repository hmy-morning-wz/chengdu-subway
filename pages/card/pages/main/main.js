import store from './store'
import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
import { makeUrl } from '/pages/card/util/request';
import state from '/pages/card/util/CardStatus';
import { jump, jumpToBusCode } from 'bus-tinyapp-components/es/utils'
// import CONFIG from '../../../../util/config'

const USE_CARD = 'https://render.alipay.com/p/f/public_transit/card_entry.html';

const createPage = function (options) {
  return Page(store.register(options))
};

const app = getApp();

createPage({
  data: {
    status: null,
    cardLogo: null,
    cardType: null,
    menus: [],
  },
  async onLoad() {
    await new Promise((resolve) => setTimeout(resolve, 30))
    my.setNavigationBar({
      title: app.config ? app.config.cardName : '',
    });
    this.setData({
      cardType: app.cardType || this.data.$global.cardInfo.cardType  // app.cardType
    });
    busService.getCard().then(autoErrorPage(({ data }) => {
      console.log('>>> 卡信息查询: ', data, app.config.menus);
      let menus
      try {
        if (data && ((data.status === 1 && data.disabled === 0) || data.status === 2 || data.status === 7)) {
          menus = app.config.menus.map(item => {
            return {
              "icon": item.icon,
              "text": item.name,
              "code": item.code,
              "url": item.url
            }
          })
          console.log('>>> 菜单0: ', menus);
        } else {
          menus = app.config.menus.map(item => {
            if (item.code !== "unregister") {
              return {
                "icon": item.icon,
                "text": item.name,
                "code": item.code,
                "url": item.url
              }
            }
          })
          console.log('>>> 菜单1: ', menus);
        }
      } catch (err) {
        menus = app.config.menus.map(item => {
          if (item.code !== "unregister") {
            return {
              "icon": item.icon,
              "text": item.name,
              "code": item.code,
              "url": item.url
            }
          }
        })
        console.log('>>> 菜单2: ', menus);
      }
      this.setData({
        cardId: data && data.cardId,
        cardLogo: app.config && app.config.logoUrl,
        status: data && data.status,
        menus
      });

    })).catch(() => {
      autoMiniErrorPage('', '/pages/card/pages/main/main');
    })
    //app.Tracker.Page.init()
  },
  onItemClick: function (ev) {
    const code = this.data.menus[ev.detail.index].code;
    let url = this.data.menus[ev.detail.index].url;
    console.log('cardType', this.data.cardType, code, url)
    // if (!url) {
    //   my.alert({
    //     title: "",
    //     content: "url错误"
    //   })
    // }  
    //url = '/pages/card/pages/travel2/travel'
    if (url) {
      if (url.startsWith("/pages/")) {
        my.navigateTo({
          url,
        });
      }
      else if (url.startsWith(USE_CARD)) {
        jumpToBusCode(this.data.cardType);
      } else {
        // startApp(url);
        jump(url);
      }
      return;
    }
    switch (code) {
      case 'balance':
        my.navigateTo({
          url: '/pages/card/pages/balance/balance',
        });
        break;
      case 'recharge':
        my.navigateTo({
          url: '/pages/card/pages/recharge/recharge',
        });
        break;
      case 'travelRecord':
        my.navigateTo({
          url: '/pages/card/pages/travel2/travel',
        });
        break;
      case 'openLines':
        my.navigateTo({
          url: '/pages/card/pages/busline/busline',
        });
        break;
      case 'faq':
        my.navigateTo({
          url: '/pages/card/pages/usage/usage',
        });
        break;
      case 'openLife':
        const url = app.config.openLifeUrl;
        console.log('生活号跳转', url)
        if (url) {
          jump(url);
        }
        break;
      case 'unregister':
        this.unregister();
        break;
      default:
        break;
    }
  },
  unregister() {
    busService.getCard().then(autoErrorPage(({ data }) => {
      if (data.status === state.ACTIVE || (data.status === 7 && data.disabled === 0)) {
        my.confirm({
          title: '提示',
          content: '确定退卡？',
          success: (res) => {
            if (res.confirm) {
              my.showLoading()
              busService.unregister().then(autoErrorPage(({ data }) => {
                console.log('unregister====>', data)
                const u = makeUrl('/pages/card/pages/invoke/invoke', { successTips: data });
                my.hideLoading()
                my.navigateTo({ url: u });
              }), autoMiniErrorPage())
            }
          }
        })
      } else {
        my.navigateTo({ url: '/pages/card/pages/invoke/invoke' });
      }
    })).catch(() => {
      autoMiniErrorPage('', '/pages/card/pages/main/main');
    });
  }
});
