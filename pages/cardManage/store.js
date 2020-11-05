import Store from 'herculex';
import mixins from '../../util/mixins';
import queryCard from '../../services/queryCard';
import refundCard from '../../services/refundCard';
import { cardType } from '../../util/config';
import { jump, jumpToBusRecord } from 'bus-tinyapp-components/es/utils';

export default new Store({
  connectGlobal: true, // 是否关联global
  state: {
  },
  actions: {
    /**
     * 关闭服务 查询卡状态
     */
    async closeServer({ commit, state, dispatch, global }) {
      my.showLoading({ content: '信息查询中' });
      const result = await queryCard();
      const { success, data } = result;
      if (success) {
        // cardStatus 为mock演示 真实情况以每次查询为准
        const { cardStatus } = global;
        if (cardStatus && data.cardStatus && data.cardStatus === 1) {
          my.hideLoading();
          mixins.showModal('confirm', {
            title: '退卡提示',
            content: '退卡后您将不能再享受刷手机乘公交的便捷服务',
            confirmButtonText: '残忍退卡',
            cancelButtonText: '我再想想'
          }).then((res) => {
            const { confirm } = res;
            if (confirm) {
              dispatch('refundCard');
            }
          });
        } else {
          my.hideLoading();
          my.navigateTo({
            url: '/pages/refundCard/refundCard' // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
          });
        }
      }
    },
    /**
     * 退卡
     */
    async refundCard({ commit, dispatch, state }) {
      my.showLoading({ content: '退卡处理中' });
      const result = await refundCard();
      const { success, data } = result;
      if (success) {
        my.hideLoading();
        if (data) {
          // mock演示 实际不需要 以每次查询结果为准
          dispatch('$global:updateCardStatus', false);
          mixins.showModal('showToast', { content: '退卡已申请' }, () => {
            my.navigateTo({
              url: '/pages/refundCard/refundCard' // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
            });
          });
        }
      }
    },
    /**
     * 跳转乘车记录
     */
    async jumpToBusRecord({ commit, state, dispatch, global }) {
      const { cardInfo } = global;
      jumpToBusRecord({
        cardType,
        cardNo: cardInfo ? cardInfo.cardNo : ''
      });
    },
    /**
     * 跳转线路查询
     */
    async jumpRouteQuery({ commit, state, dispatch, global }) {
      const { routeQueryUrl } = global;
      routeQueryUrl && jump('https://www.taobao.com');
    }
  }
});
