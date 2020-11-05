import store from './store';
import { jump } from 'bus-tinyapp-components/es/utils';

const createPage = function(options) {
  return Page(store.register(options));
};
createPage({
  data: {
  },
  onShow() {
  },
  btnRecord() {
    this.dispatch('jumpToBusRecord');
  },
  btnRoute() {
    this.dispatch('jumpRouteQuery');
  },
  btnUseHelp() {
    my.navigateTo({
      url: '/pages/card/pages/usage/usage'
    });
  },
  btnCloseServer() {
    this.dispatch('closeServer');
  }
});
