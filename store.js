import { GlobalStore } from 'herculex'
// import mixins from './util/mixins';
// import { getAuthUserInfo, silenceAuthCode } from './util/auth';
// import { cardType } from './util/config'
import { getCardInfo } from 'bus-tinyapp-components/es/utils'
export default new GlobalStore({
  state: {
    cityInfo: null,
    cardStatus: true,
    systemInfo: null,
    cardType: null,
    cardInfo: null
  },
  mutations: {
    SET_CITY_INFO: (state, cityInfo) => {
      console.log('设置城市信息', cityInfo)
      state.cityInfo = cityInfo
    },
    CARD_TYPE: (state, cardType) => {
      console.log('设置卡片类型', cardType)
      state.cardType = cardType
    },
    CARD_INFO: (state, cardInfo) => {
      console.log('设置卡片信息', cardInfo)
      state.cardInfo = cardInfo
    },
    UPDATE_SYSTEM: (state, sys) => {
      console.log('设置系统信息', sys)
      state.systemInfo = sys
    }
  },
  actions: {
    // 获取系统信息
    async updateSystemInfo({ commit }) {
      let res = my.getSystemInfoSync() // 阻塞式获取系统信息
      
      //let version = res.version.replace('.', '').replace('.', '')
      let versionCodes = res.version.split(".").map((t) => parseInt(t));
      let version = versionCodes[0] * 10000 + versionCodes[1] * 100 + versionCodes[2];
      if (version < 100132) {
      //if (parseInt(version) < 10132) {
        my.showToast({
          type: 'success',
          content: '您当前支付宝版本过低，须更新'
        })
        my.canIUse('ap.updateAlipayClient')
        my.ap.updateAlipayClient()
      }
      console.log('!!!成功获取系统信息', res)
      commit('UPDATE_SYSTEM', res)
    },
    /**
     * 获取公交卡信息
     */
    async getCardInfo({ commit }, payload) {
      console.log('支付宝查卡', payload)
      getCardInfo(payload).then((cardInfo) => {
        console.log('获取卡信息成功', cardInfo)
        commit('CARD_INFO', cardInfo)
        commit('CARD_TYPE', cardInfo.cardType)
      }).catch((e) => {
        console.log('获取卡信息异常-----', e)
      });
    },
    /**
     * 本地mock演示
     */
    async updateCardStatus({ commit }, payload) {
      commit('UPDATE_CARD_STATUS', { cardStatus: payload });
    },
    /**
     * 将乘车权益数据放在全局
     */
    async setRightsDatas({ commit }, payload) {
      commit('SET_RIGHTS_DATAS', { rightsDatas: payload });
    },
    /**
     * 将城市资讯放在全局
     */
    async setCityInfo({ commit }, payload) {
      commit('SET_CITY_INFO', { cityInfo: payload });
    }
  }
});
