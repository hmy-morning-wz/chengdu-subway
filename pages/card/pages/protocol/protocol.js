Page({
  data: {
    url: null
  },
  onLoad(query) {
    this.setData({
      url: query.url
    });
  },
});
