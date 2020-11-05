import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';

Page({
  data: {
    disabled: 0,
    unregisterMessage: null,
    successTips: null,
    rollbackDisable: false,
    msg: '确定'
  },

  onLoad(options) {
    const successTips = (options && 'successTips' in options) ? options.successTips : null;
    const info = getApp().config;
    console.log('unRegisterMemo', info)
    const unregisterMessage = info.unRegisterMemo ? info.unRegisterMemo : '我们将尽快审核您的申请，申请成功后您的卡片将会被删除。';
    this.setData({
      unregisterMessage,
      successTips,
    });
    busService.getCard().then(autoErrorPage(({ data }) => {
      console.log('>>> 卡信息查询: ', data);
      this.setData({
        status: data.status,
        disabled: data.disabled,
        rollbackDisable: data.status == 5,
        msg: (data.status === 2 || (data.status === 7 && data.disabled === 1))? '撤回申请' : '确定'
      });
    })).catch(error => {
      autoMiniErrorPage('', '/card/pages/main/main');
    });
  },

  onShow() {
    if (this.data.successTips !== null) {
      my.alert({
        title: '', // alert 框的标题
        content: this.data.successTips,
        buttonText: '确定',
      });
    }
  },

  doRollback() {
    // my.navigateBack({
    //   delta: 9999
    // })
    if (this.data.status === 2 || (this.data.status === 7 && this.data.disabled === 1)) {
      my.showLoading({
        content: '撤回中...',
      });
      busService.rollbackUnregister().then(autoErrorPage(({ code, msg, data }) => {
        my.hideLoading();
        console.log('rollbackUnregister====>', code, msg, data);
        if (code === 200) {
          my.alert({
            title: '撤回成功', // alert 框的标题
            content: '您可以继续使用公交付款服务',
            buttonText: '立即查看',
            success: () => {
              my.navigateBack({
                delta: 1
              })
            },
          });
        } else {
          my.alert({
            title: '撤回失败', // alert 框的标题
            content: msg
          });
        }
      }), autoMiniErrorPage());
    } else {
      my.navigateBack({
        delta: 9999
      })
    }
  }
})
