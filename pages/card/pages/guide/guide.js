import busService from '/pages/card/service/busService';
import config from '/pages/card/util/config';
import CardAuthFailCode from '/pages/card/util/CardAuthFailCode';
import {
  autoErrorPage,
  autoMiniErrorPage,
  startApp
} from '/pages/card/util/ErrorHandler';
import { makeUrl } from '/pages/card/util/request';
import aliParse from '/pages/card/aliParse/aliParse.js';
import Utils from '/pages/card/util/Utils';
import { jump } from 'bus-tinyapp-components/es/utils';

const app = getApp();

Page({
  data: {
    loading: true,
    agreed: false,
    agreementVisiable: false,
    ebusConfig: null,
    info: null,
    isIos: false,
    certUrl: null,
    protocolUrl: null
  },
  /** 页面加载时触发 */
  onLoad() {
    this.setData({
      loading: false,
      protocols: app.config.agreements,
      ebusConfig: app.config,
      info: app.config,
      isIos: Utils.isIOS(),
    });    
    my.setNavigationBar({
      title: this.data.ebusConfig.cardName,
    });

    // 获取实名认证url
    busService.getCertUrl(config.APP_SOURCE).then(autoErrorPage(({
      data
    }) => {
      console.log(">>>>> 实名URL", data.url);
      this.setData({
        certUrl: data.url
      });
    }, '/card/pages/guide/guide'), autoMiniErrorPage());
  },


  onShow() {

  },

  hideAgreement() {
    this.setData({
      agreementVisiable: false
    });
  },

  argeed(e) {
    this.setData({
      agreed: true,
    });
  },

  /** 协议弹出 */
  onAgreement(event) {
    // this.setData({ agreementVisiable: true, protocolUrl:  event.target.dataset.url});
    console.log('>>>> 协议URL', event.target.dataset.url);    
    // my.redirectTo({ url: makeUrl('/pages/protocol/protocol', {url: event.target.dataset.url}) });
    jump(event.target.dataset.url);
  },

  // 领取卡片 需要实名认证
  onConfirmOpen() {
    // startApp(this.data.certUrl);
    if (!this.data.agreed) {
      my.alert({content: '请先阅读并同意协议'});
      return;
    }
    // 跳转到授权领卡
    my.addCardAuth({
      url: this.data.certUrl,
      success: (res) => {
        // 授权成功后执行开卡请求
        console.log('授权领卡===', JSON.stringify(res));
        if (res.success && res.resultStatus === "9000") {
          const param = {
            requestId: res.result.request_id,
            authCode: res.result.auth_code,
            appSource: config.APP_SOURCE,
            isCreditOpened: 'true',
          };          
          busService.register(param).then(autoErrorPage(() => {
            this.setData({
              loading: true,
            });
            my.redirectTo({
              url: '/pages/card/pages/main/main?6',
            });
          }), autoMiniErrorPage());
        } else {
          const msg = CardAuthFailCode.toName(res.resultStatus);
          my.showToast({
            type: 'fail',
            content: msg,
          });
        }
      },
      fail: (res) => {
        const msg = CardAuthFailCode.toName(res.code);
        if (msg) {
          my.showToast({
            type: 'fail',
            content: msg,
          });
        }
      },
    });
  },
});