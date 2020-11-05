import {
  request
} from '../util/service'
import minxins from '../util/mixins'

// 接口请求地址
// const path = '/prefer/icon/getByParam'
export default {
  // 获取icon 地址
  getIconList: async (params = {}) => {
    const originData = await request(`/api/marketing?cityCode=${params.cityCode}`, {}, {
      on: false,
      data: {}
    }, 'get', {
      urlType: 'cardManageDomain'
    })
    // 数据处理
    console.log('获取icon返回数据：', originData);
    if (!originData.API_ERROR && originData.msg === 'SUCCESS' && (originData.data || params.appid === '2019022163294228')) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    // minxins.showModal('showToast', {
    //   type: 'fail',
    //   title: '温馨提示',
    //   content: originData.errorMsg ? originData.errorMsg : '接口请求错误!'
    // })
    return {
      success: false
    }
  }
}
