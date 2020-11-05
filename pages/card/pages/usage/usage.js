import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';

Page({
  data: {
    excludeExpand: true,

    lastIndex: -1,
    faqs: [],
  },
  async onShow() {

    if (busService.config) {
      busService.getConfig('ioc.ebuscard.city.faq').then(autoErrorPage(({data}) => {
        console.log('>>>> 使用帮助: ', data);
        if (data) {
          const faqs = data.list.map(item => {
            return { ...item, expanded: false };
          });
          this.setData({ faqs });
        }
      }))
    } else {
      let time = 30
      let set = setInterval(() => {
          time--
          if (time === 0 || busService.config) {
            clearInterval(set)
            busService.getConfig('ioc.ebuscard.city.faq').then(autoErrorPage(({data}) => {
              console.log('>>>> 使用帮助: ', data);
              if (data) {
                const faqs = data.list.map(item => {
                  return { ...item, expanded: false };
                });
                this.setData({ faqs });
              }
            }));
          }
      }, 100)
    }
  },

  onTitleTap(e) {
    console.log('?????????    ', this.data, e);
    const { index } = e.target.dataset;

    const faqsSetting = { lastIndex: index };

    faqsSetting[`faqs[${index}].expanded`] = !this.data.faqs[index].expanded;

    if (this.data.lastIndex !== index && this.data.lastIndex >= 0 && this.data.excludeExpand) {
      faqsSetting[`faqs[${this.data.lastIndex}].expanded`] = false;
    }

    console.log('setttt    ', faqsSetting);

    this.setData(faqsSetting);
  },
});
