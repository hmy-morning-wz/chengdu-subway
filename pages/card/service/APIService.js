import { doGet, doPost } from '/pages/card/util/request';
import { getTimestamp } from '/pages/card/util/Utils';
// import getDomain from '../../../util/env'

const DEFAULT_GATEWAY = '/gateway.do';

const CTOKEN_HEADER_NAME = 'COM_IOC_CTOKEN';

export default class APIService {
  init(host, gateway, ctoken) {
    this.gateway = gateway || DEFAULT_GATEWAY;
    this.host = host;

    // console.log('初始化', `${this.host}${this.gateway}`)
    this.apiUrl = `${this.host}${this.gateway}`;

    this.ctoken = ctoken;
  }

  setCToken(ctoken) {
    this.ctoken = ctoken;
  }

  addTokenHeader(options) {
    const opts = options || {};

    if (!('headers' in opts)) {
      opts.headers = {};
    }

    opts.headers[CTOKEN_HEADER_NAME] = this.ctoken;

    return opts;
  }

  apiRequest(api, data, requestMethod, options) {
    const bizContent = JSON.stringify(data || {});
    const newBody = {
      service: api,
      biz_content: bizContent,
      v: (options.ver || '1.0'),
      timestamp: getTimestamp(),
    };

    return requestMethod(this.apiUrl, newBody, this.addTokenHeader(options));
  }

  apiGet(api, data, option) {
    return this.apiRequest(api, data, doGet, {
      method: 'GET',
      ...option,
    });
  }

  apiPost(api, data, option) {
    return this.apiRequest(api, data, doPost, {
      method: 'POST',
      ...option,
    });
  }
}