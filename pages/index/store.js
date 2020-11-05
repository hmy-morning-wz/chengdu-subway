import Store from 'herculex'
import CONFIG from '../../services/config'
import INDEX from './gridData'
import {
  alipayAppId
} from '../../util/config'
export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
    iconList: INDEX.iconList,
    post: INDEX.post,
    welfare: INDEX.welfare,
    lifestyle: INDEX.lifestyle,
    cardManage: INDEX.cardManage,
    alipayAppId,
  },
  mutations: {
    // 设置 icon
    SET_ICON_LIST: (state, config) => {
      console.log('卡片配置', config)
      state.iconList = config.iconList
      state.post = config.post
      state.welfare = config.welfare
      state.lifestyle = config.lifestyle
      state.cardManage = config.cardManage
    }
  },
  actions: {
    async getIconList({ commit }, param) {
      const {
        success,
        data
      } = await CONFIG.getIconList(param)
      if (success) {
        // 首页icon 配置
        console.log('获取icon列表', data)
        commit('SET_ICON_LIST', JSON.parse(data.homePage))
      }
    }
  }
})