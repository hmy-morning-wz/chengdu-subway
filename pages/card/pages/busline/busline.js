import busService from '/pages/card/service/busService';
// import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
let MOCKData = {"code":200,"msg":"SUCCESS","redirectUrl":null,"data":{"list":[{"lines":[{"no":"1997","from":"香港","to":"祖国"},{"no":"2017","from":"鼓浪屿","to":"体育中心"}],"vehicleType":"bus"},{"lines":[{"lineCode":"0001","lineName":"1号线","stationList":[{"stationCode":"0121","stationName":"北环城路"},{"stationCode":"0122","stationName":"庆丰路"},{"stationCode":"0123","stationName":"一匡街"},{"stationCode":"0124","stationName":"长春站北"},{"stationCode":"0125","stationName":"长春站"},{"stationCode":"0126","stationName":"胜利公园"},{"stationCode":"0127","stationName":"人民广场"},{"stationCode":"0128","stationName":"解放大路"},{"stationCode":"0129","stationName":"东北师大"},{"stationCode":"0130","stationName":"工农广场"},{"stationCode":"0131","stationName":"繁荣路"},{"stationCode":"0132","stationName":"卫星广场"},{"stationCode":"0133","stationName":"市政府"},{"stationCode":"0134","stationName":"华庆路"},{"stationCode":"0135","stationName":"红嘴子"}]},{"lineCode":"0002","lineName":"2号线","stationList":[{"stationCode":"0224","stationName":"双丰"},{"stationCode":"0225","stationName":"长春西站"},{"stationCode":"0226","stationName":"兴隆堡"},{"stationCode":"0227","stationName":"西环城路"},{"stationCode":"0228","stationName":"和平大街"},{"stationCode":"0229","stationName":"万福街"},{"stationCode":"0230","stationName":"景阳广场"},{"stationCode":"0231","stationName":"解放桥"},{"stationCode":"0232","stationName":"建设广场"},{"stationCode":"0233","stationName":"文化广场"},{"stationCode":"0234","stationName":"解放大路"},{"stationCode":"0235","stationName":"平阳街"},{"stationCode":"0236","stationName":"南关"},{"stationCode":"0237","stationName":"吉林大路"},{"stationCode":"0238","stationName":"东盛大街"},{"stationCode":"0239","stationName":"东环城路"},{"stationCode":"0240","stationName":"长青"},{"stationCode":"0241","stationName":"东方广场"}]},{"lineCode":"0003","lineName":"3号线","stationList":[{"stationCode":"0323","stationName":"长春站"},{"stationCode":"0324","stationName":"辽宁路"},{"stationCode":"0325","stationName":"芙蓉桥"},{"stationCode":"0326","stationName":"西安桥"},{"stationCode":"0327","stationName":"南昌路"},{"stationCode":"0328","stationName":"朝阳桥"},{"stationCode":"0329","stationName":"解放桥"},{"stationCode":"0330","stationName":"湖西桥"},{"stationCode":"0331","stationName":"宽平桥"},{"stationCode":"0332","stationName":"抚松路"},{"stationCode":"0333","stationName":"孟家屯"},{"stationCode":"0334","stationName":"湖光路"},{"stationCode":"0335","stationName":"电台街"},{"stationCode":"0336","stationName":"前进西"},{"stationCode":"0337","stationName":"前进大街"},{"stationCode":"0338","stationName":"卫明街"},{"stationCode":"0339","stationName":"卫光街"},{"stationCode":"0340","stationName":"卫星广场"},{"stationCode":"0341","stationName":"亚泰立交桥"},{"stationCode":"0342","stationName":"伊通河"},{"stationCode":"0343","stationName":"职业学院"},{"stationCode":"0344","stationName":"吉林广电"},{"stationCode":"0345","stationName":"会展中心"},{"stationCode":"0346","stationName":"世纪广场"},{"stationCode":"0347","stationName":"金鑫街"},{"stationCode":"0348","stationName":"博硕路"},{"stationCode":"0349","stationName":"金河街"},{"stationCode":"0350","stationName":"农博园"},{"stationCode":"0351","stationName":"净月潭公园"},{"stationCode":"0352","stationName":"紫杉路"},{"stationCode":"0353","stationName":"宝相街"},{"stationCode":"0354","stationName":"滑雪场"},{"stationCode":"0355","stationName":"长影世纪城"}]},{"lineCode":"0004","lineName":"4号线","stationList":[{"stationCode":"0421","stationName":"长春站北"},{"stationCode":"0422","stationName":"北亚泰大街"},{"stationCode":"0423","stationName":"伪满皇宫"},{"stationCode":"0424","stationName":"东大桥"},{"stationCode":"0425","stationName":"东新路"},{"stationCode":"0426","stationName":"吉林大路"},{"stationCode":"0427","stationName":"公平路"},{"stationCode":"0428","stationName":"海口路"},{"stationCode":"0429","stationName":"浦东路"},{"stationCode":"0430","stationName":"威海路"},{"stationCode":"0431","stationName":"北海路"},{"stationCode":"0432","stationName":"职业学院"},{"stationCode":"0433","stationName":"世荣路"},{"stationCode":"0434","stationName":"南环城路"},{"stationCode":"0435","stationName":"宜盛街"},{"stationCode":"0436","stationName":"天工路"}]},{"lineCode":"0008","lineName":"8号线","stationList":[{"stationCode":"0821","stationName":"北环城路"},{"stationCode":"0822","stationName":"一二三中学"},{"stationCode":"0823","stationName":"小南"},{"stationCode":"0824","stationName":"小城子街"},{"stationCode":"0825","stationName":"北湖大桥"},{"stationCode":"0826","stationName":"北湖公园"},{"stationCode":"0827","stationName":"和安街"},{"stationCode":"0828","stationName":"光机路"},{"stationCode":"0829","stationName":"大学城路"},{"stationCode":"0830","stationName":"地理所"},{"stationCode":"0831","stationName":"奥林匹克公园"},{"stationCode":"0832","stationName":"广通路"}]}],"vehicleType":"metro"}]}}

Page({
  data: {
    tabs2: [
      {
        title: '公交线路',       
      },
      {
        title: '地铁线路',        
      }   
    ],
    activeTab2: 0,
    value: '',
    lines: [],
    multiLines:[],
    multiIndex:0,
    showMultiLines:false,
    sourceData: [],
    cancelStyle: 'search-cancel_hidden',
    searchStyle: 'search-input_1',
  },
     
  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },

  async onLoad() {
//getMultiLines

  let res = await busService.getMultiLines({cityCode : getApp().cityCode})
   //res = MOCKData
  console.log('>>> 开通线路信息1: ', res);
  if(res && res.data ) {
    /**{ "list": [{ "lines": [{ "from": "香港", "no": "1997", "to": "祖国" }, {"from": "鼓浪屿", "no": "2017", "to": "体育中心" }], "vehicleType": "bus" }, {"lines": [{ "lineCode": "0008", "lineName": "8号线",
"stationList": [{ "stationCode": "0821", "stationName": "北环城路" }] }], "vehicleType": "metro" }] }
 */
    let {data} = res
    let busIndex 
    let metroIndex 
     let platformList = []
    let lines=[],list=[],sourceData=[]
    let showMultiLines = 0
    for(let i=0;i<data.list.length;i++) {
       if(data.list[i].vehicleType=='metro') {
         metroIndex = i
         list=data.list[metroIndex].lines
         if(list && list.length) {
           showMultiLines++
         }
         data.list[metroIndex].lines.map(item => {
          platformList.push(item.stationList)
          return item
         })
       }
       else if(data.list[i].vehicleType=='bus') {
         busIndex = i
         lines=data.list[busIndex].lines
          if(lines && lines.length) {
           showMultiLines++
         }
         sourceData = lines
       }
    }
   
     
    

   this.setData({
          metroIndex,
          busIndex,
          showMultiLines:data.list.length>1 && showMultiLines>1,
          lines,
          platformList,
          activeIndex:0,
          metroList:list,
          vehicleType:(data.list[0].lines.length && data.list[0].vehicleType) || (data.list[1].lines.length && data.list[1].vehicleType),
          multiIndex:0,
          activeTab2:lines.length?0:1,
          multiLines: data.list,
          sourceData,
          value: ''
   });
  }else {
     if (busService.config) {
      busService.getConfig('ioc.ebuscard.city.lines').then(({data}) => {
        console.log('>>> 开通线路信息: ', data);
        this.setData({
          multiIndex:0,
          showMultiLines:false,
          vehicleType:"bus",
          lines: data.list,
          sourceData: data.list,
          value: ''
        });
      });
    } else {
      let time = 30
      let set = setInterval(() => {
          time--
          if (time === 0 || busService.config) {
            clearInterval(set)
            busService.getConfig('ioc.ebuscard.city.lines').then(({data}) => {
              console.log('>>> 开通线路信息: ', data);
              this.setData({
                multiIndex:0,
                vehicleType:"bus",
                showMultiLines:false,
                lines: data.list,
                sourceData: data.list,
                value: ''
              });
            })
          }
      }, 100)
    }
  }
  },
    handleMenu(e) {
    console.log(e)
    this.setData({
      activeIndex: +e.currentTarget.dataset.index
    })
  },
  onShow() {
    /*
    if (busService.config) {
      busService.getConfig('ioc.ebuscard.city.lines').then(({data}) => {
        console.log('>>> 开通线路信息: ', data);
        this.setData({
          lines: data.list,
          sourceData: data.list,
          value: ''
        });
      });
    } else {
      let time = 30
      let set = setInterval(() => {
          time--
          if (time === 0 || busService.config) {
            clearInterval(set)
            busService.getConfig('ioc.ebuscard.city.lines').then(({data}) => {
              console.log('>>> 开通线路信息: ', data);
              this.setData({
                lines: data.list,
                sourceData: data.list,
                value: ''
              });
            })
          }
      }, 100)
    }*/
  },

  search(value) {    
    if (value !== this.data.value) {
      const test = (word) => {
        return word.toString().indexOf(value) >= 0;
      };
      const lines = this.data.sourceData.filter((line) => {
        return value === null || value === '' || test(line.no) || test(line.from) || test(line.to);
      });

      this.setData({ value, lines });
    }
  },

  handleInput(value) {    
    this.search(value);
  },
  handleClear(value) {
    this.search(value);
  },
  handleFocus() {},
  handleBlur() {},
  handleCancel() {
    this.search('');
  },
  handleSubmit(value) {
   this.search(value);
  },
});
