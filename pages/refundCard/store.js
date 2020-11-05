import Store from 'herculex';
import mixins from '../../util/mixins';
import cancelApply from '../../services/cancelApply';

export default new Store({
  // connectGlobal: true, // 开启监听全局store开关，是否关注全局信息
  state: {
    type: 'success',
    title: '退卡申请已提交',
    subTitle: '我们将在7个工作日审核您的申请',
    messageButton: {
      mainButton: {
        buttonText: '完成'
      },
      subButton: {
        buttonText: '撤回申请'
      }
    }
  },
  actions: {
    /**
     * 撤回申请
     */
    async cancelApply({ commit, state, dispatch }) {
      const result = await cancelApply();
      const { success, data } = result;
      if (success) {
        data && mixins.showModal('alert', { title: '信息', content: '您已成功取消退卡申请', buttonText: '我知道了' }, () => {
          // mock演示 实际不需要 以每次查询结果为准
          dispatch('$global:updateCardStatus', true);
          my.navigateBack({
            delta: 1
          });
        });
      }
    }
  }
});
