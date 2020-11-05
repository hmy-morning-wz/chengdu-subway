export default {
  "iconList": [{
      "type": "alipay",
      "icon": "",
      "text": "",
      "desc": "公告信息",
      "url": "https://render.alipay.com/p/s/bus-card/www/index.html?enableWK=YES&vehicleType=bus&cityCode=620100&chInfo=lanzhouxiaochengxu"
    },
    {
      "type": "alipay",
      "icon": "",
      "text": "",
      "desc": "线路查询",
      "url": "alipays://platformapi/startApp?appId=20000076&actionType=toBillList&returnHome=NO&extReq=%7B%22cardType%22%3A%20%22T0620100%22%7D&bizSubType=SUB_TYPE_75%2CSUB_TYPE_107"
    },
    {
      "type": "alipay",
      "icon": "",
      "text": "",
      "desc": "描述信息",
      "url": "https://render.alipay.com/p/f/fd-jbgkw08a/cardLines.html?cardType=T0620100"
    },
    {
      "type": "alipay",
      "icon": "",
      "text": "",
      "desc": "描述信息",
      "url": "alipays://platformapi/startapp?appId=20000691&url=/www/src/index.html?scene=app_xxhf_gongjiao"
    }
  ],
  // 公告
  "post": {
    "indicatorDots": false, // 是否显示指示点
    "isAutoPlay": true,
    "current": 0, // 当前序号
    "interval": 5000, // 自动切换时间间隔 5000ms
    "vertical": true, // 默认为横向
    "arr": [{
      "type": "alipay",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "poster": "", // 海报图
      "imgUrl": "",
      "text": "",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "https://render.alipay.com/p/s/bus-card/www/index.html?enableWK=YES&vehicleType=bus&cityCode=460100&chInfo=haikouxiaochengxu" // 不跳转的时候链接为空
    }, {
      "type": "none",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "poster": "", // 海报图
      "imgUrl": "",
      "text": "",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "https://render.alipay.com/p/s/bus-card/www/index.html?enableWK=YES&vehicleType=bus&cityCode=460100&chInfo=haikouxiaochengxu" // 不跳转的时候链接为空
    }]
  },
  // 乘车福利
  "welfare": {
    "label": "",
    "indicatorDots": true, // 是否显示指示点
    "isAutoPlay": false,
    "current": 0, // 当前序号
    "interval": 5000, // 自动切换时间间隔 5000ms
    "vertical": false, // 默认为横向
    "arr": [{
      "type": "none",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "imgUrl": "https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/mini/card@3x.png",
      "text": "乘车福利",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "/pages/webview/webview?url=https://sitoss-operation.allcitygo.com/realtimebus/pro/index.html#/" // 不跳转的时候链接为空
    }, {
      "type": "none",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "imgUrl": "https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/mini/card@3x.png",
      "text": "海口公交",
      "remarks": "2018120662481627", //小程序appid 或者h5跳转参数
      "url": "" // 不跳转的时候链接为空
    }]
  },
  // 设置
  "lifestyle": {
    "label": "",
    "arr": [{
      "type": "self",
      /* 小程序自身页面 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "imgUrl": "https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/mini/tianjia@3x.png",
      "text": "添加桌面",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "/pages/guide/guide?imgUrl=https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/add_mini_haikou.png" // 不跳转的时候链接为空
    }, {
      "type": "alipay",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "imgUrl": "https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/mini/yijian@3x.png",
      "text": "意见反馈",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "https://render.alipay.com/p/s/bus-card/www/index.html?enableWK=YES&vehicleType=bus&cityCode=460100&chInfo=haikouxiaochengxu" // 不跳转的时候链接为空
    }, {
      "type": "alipay",
      /* 支付宝 alipay 自有链接 h5 小程序miniapp 不跳转 none */
      "imgUrl": "https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/mini/yijian@3x.png",
      "text": "绿色出行",
      "remarks": "", //小程序appid 或者h5跳转参数
      "url": "https://render.alipay.com/p/s/bus-card/www/index.html?enableWK=YES&vehicleType=bus&cityCode=460100&chInfo=haikouxiaochengxu" // 不跳转的时候链接为空
    }]
  },
  // 是否显示卡片管理
  "cardManage": {
    "isShow": true,
    "isSelf": false
  }
}