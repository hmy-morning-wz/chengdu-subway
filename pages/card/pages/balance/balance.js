import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
import AccountType from '/pages/card/util/AccountType';
import Utils from '/pages/card/util/Utils';
import state from '/pages/card/util/CardStatus';

const TPL_MAP = {};
TPL_MAP[AccountType.RECHARGE] = 'recharge';
TPL_MAP[AccountType.MONTH] = 'month';
TPL_MAP[AccountType.SEASON] = 'season';
TPL_MAP[AccountType.YEAR] = 'year';
TPL_MAP[AccountType.ALIPAY_CREDIT] = 'credit';


Page({
  data: {
    loading: false,
    data: null,
    accounts: [],
    cardActive: true
  },

  onShow() {
    this.setData({ loading: true, data: null });

    busService.getCard().then(autoErrorPage(({ data}) => {
      const accounts = data.accounts.map((acc) => {
        if (acc.type === 1) {
          return {
            tpl: TPL_MAP[acc.type],
            type: acc.type,
            title: acc.name || '电子钱包',
            balance: acc.balance,
            balanceTitle: Utils.formatRMBYuanDecimal(acc.balance) + '元',
            memo: acc.memo,
          }
        }
        // console.log('acc', getApp().config.supportAccount || [], acc)
        // const accConfig = Utils.getAccountByType(getApp().config.supportAccount || [], acc.type) || { name: getApp().config.supportAccount[0] || '电子钱包'.name, memo: '暂无说明' };
        // console.log('accConfig', accConfig)
        // return {
        //   tpl: TPL_MAP[acc.type],
        //   type: acc.type,
        //   title: accConfig.name,
        //   balance: acc.balance,
        //   balanceTitle: Utils.formatRMBYuanDecimal(acc.balance) + '元',
        //   memo: acc.memo,
        // }
      })
      // .filter( e => {
      //   return e.type === 1;
      // });

      console.log('accounts', accounts)
      
      this.setData({ loading: false, data, accounts, cardActive: data.status === state.ACTIVE });
    }), autoMiniErrorPage());
  },

  onTapRecharge() {
    my.navigateTo({ url: '/pages/card/pages/recharge/recharge' });
  },

  onTapRechargeLog() {
    my.navigateTo({ url: '/pages/card/pages/payrecords/payrecords' });
  },
});
