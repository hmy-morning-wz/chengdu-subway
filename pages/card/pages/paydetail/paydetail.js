import Utils from '/pages/card/util/Utils';
import PayStatus from '/pages/card/util/PayStatus';

const app = getApp();
Page({
  data: {
    info: null,
    accConfig: null,
  },
  onLoad() {

  },

  onShow() {
    const info = app.item;
    info.status = PayStatus.toName(info.status);
    const acc = Utils.getAccountByType(app.config.supportAccount, info.accountType);
    const accConfig = acc ? acc.name : `未知-${info.accountType}`;
    this.setData({ info, accConfig });
  },

});
