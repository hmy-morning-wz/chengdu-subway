import store from './store';

const createPage = function(options) {
  return Page(store.register(options));
};
createPage({
  data: {
  },
  onLoad() {
  },
  onShow() {
  },
  onReady() {
  },
  onTapMain() {
    console.log('----- 您点击了完成 -----');
    my.navigateBack({
      delta: 1
    });
  },
  onTapSub() {
    console.log('----- 您点击了撤回申请 -----');
    this.dispatch('cancelApply');
  }
});
