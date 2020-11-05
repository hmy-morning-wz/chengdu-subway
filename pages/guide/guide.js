import store from './store'
const createPage = function(options) {
  return Page(store.register(options))
};
createPage({
  data: {
    bannerSize: {},
    imgUrl: ''
  },
  onLoad(options) {
    console.log(options, this.data.$global)
    this.setData({
      imgUrl: options.imgUrl
    })
    this.getSystemInfo()
  },
  // 设置图片宽高比
  async getSystemInfo () {
    this.setData({
      bannerSize: {
        w: this.data.$global.systemInfo.windowWidth,
        h: this.data.$global.systemInfo.windowWidth * 3.672
      }
    })
  },
  onShow() {
  },
  onReady() {
  }
});
