// 获取应用实例
const app = getApp();

Page({
  data: {
    checked: false,
    popupShow: false,
    guideShow: false,
    cardAnimation: null,
    bgAnimation: null
  },
  handleChange(e) {
    this.setData({
      checked: true,
      popupShow: false
    });
  },
  showDialog() {
    if (!this.data.checked) {
      this.setData({
        popupShow: true
      });
    }
  },
  toggleAnime() {
    return;
/*
    !this.cardAnimation && (this.cardAnimation = my.createAnimation({
      transformOrigin: 'bottom left'
    }));
    !this.bgAnimation && (this.bgAnimation = my.createAnimation());

    if (!this.data.guideShow) {
      this.cardAnimation.scale(0.3, 0.3).step();
      this.bgAnimation.height('500rpx').step();
    } else {
      this.cardAnimation.scale(1, 1).step();
      this.bgAnimation.height('230rpx').step();
    }

    this.setData({
      guideShow: !this.data.guideShow,
      cardAnimation: this.cardAnimation.export(),
      bgAnimation: this.bgAnimation.export()
    });*/
  },
  handleTap() {
    // my.navigateTo({
    //   url: '/pages/success/index'
    // });
    my.call('startApp', {
      appId: '2018082061058976',
      params: {
        appClearTop: false,
        startMultApp: 'YES',
        bizPage: 'auth',
        app_id: '2018082061058976',
        sign_params: 'biz_content%3D%7B%22app_id%22%3A%222018082061058976%22%2C%22biz_content%22%3A%22%7B%7D%22%2C%22card_no%22%3A%222088000011112222%22%2C%22card_type%22%3A%22TEST0001%22%2C%22charset%22%3A%22utf-8%22%2C%22sign%22%3A%22IpIRET0G4mG62Dg5ZoWlITxmF7zPOghiGe4i4PlUE%2Bk%2FIJoCjF7gT8vW4mu5wdXw%2Fzm9w3qQLpuSXYSRlaX6Jnf7s4Ld5dPJK3R%2BIuSyrmILjMUi5KvbXIcDUPs8EHqsIubBpMe32DV%2BRoeSHgrPv306qXbrmDPwkruuJYZFM0I7mpAX3MHfllat4lllzCOr1dh62zSRTf6cfmutQ6qWm9FQat70ebwn3%2FiXs%2BMWgsJTs6ug6wLJLW2XKt3S0VhLlF624DkQqKse0DHlYyFtllQkGU%2BRK%2FKN7%2BPPPEStDQ5RgtPuq8gdqns1jH2lGIuqTv93Sag5SufUusgPr7oTkw%3D%3D%22%2C%22sign_type%22%3A%22RSA2%22%2C%22timestamp%22%3A%221534749512%22%2C%22version%22%3A%221.0%22%7D'
      }
    }, (result) => {
      // my.alert({
      //   content: JSON.stringify(result)
      // });
      console.log(JSON.stringify(result));
    });
  }
});
