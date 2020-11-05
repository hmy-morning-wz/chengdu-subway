Page({
  data: {
    info: {
      code:null, //'500',
      message: '服务器开小差了，请稍后重试',
      btnMethod: 'onRetry',
      btnName: '重试',
    }
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      info: {
        code: null,//'500',
        message: '服务器开小差了，请稍后重试',
        btnMethod: 'onRetry',
        btnName: '重试',
      }
    });
  },

  onRetry() {
    my.redirectTo({
      url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
    });
  },
});
