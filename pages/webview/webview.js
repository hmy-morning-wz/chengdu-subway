import store from './store'
const createPage = function (options) {
  return Page(store.register(options))
};
createPage({
  data: {
    url: '' // h5链接
  },
  onLoad(options) {
    this.setData({
      url: options.url
    })
  },
  onShow() {
  },
  onReady() {
  }
});
