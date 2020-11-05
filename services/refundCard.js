import { request } from '../util/service';
import { mockData } from './mock/refundCard.mock';
import minxins from '../util/mixins';

// 接口请求地址
const path = '';

export default async function refundCard(params = {}) {
  const originData = await request(path, params, { on: true, data: mockData }, 'post');
  // 数据处理
  // 如果接口错误，直接把错误返回，如果接口正常，则把数据中的data返回
  console.log('----- service refundCard originData -----', originData);
  if (!originData.API_ERROR && originData.success && originData.data) {
    return {
      success: true,
      data: originData.data
    };
  }
  my.hideLoading();
  minxins.showModal('showToast', { type: 'fail', title: '温馨提示', content: originData.errorMsg ? originData.errorMsg : '接口请求出错!' });
  return { success: false };
}
