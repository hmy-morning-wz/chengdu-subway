const app = getApp()
Page({
  data: {
    success: false
  },
  onLoad(options) {
    console.log(options)
    if (app.trans.recordType === '进站') {
      my.setNavigationBar({
        title: '进站补登'
      })
    } else {
      my.setNavigationBar({
        title: '出站补登'
      })
    }
    this.setData({
      msg:options.msg||'',
      success: options.type === 'success' ? true : false,
    })
    //app.Tracker.Page.init()
  },

  backHome() {
    my.navigateBack({
      delta: 9999
    });
  },
});
