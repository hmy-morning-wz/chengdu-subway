import TinyAppHttp from './TinyAppHttp';
import {
  sessionIdName
} from './config';
import getDomain from './env';
// import mixins from './mixins';
import {
  getAuthCode,
  silenceAuthCode
} from './auth';

// const app = getApp();
let tinyAppHttp = new TinyAppHttp({
  // 请求中需要增加的配置
  sessionIdName
});
// 增加format response data的拦截器
tinyAppHttp.interceptors.response.use(
  ({
    data
  }) => {
    my.hideLoading()
    return data
  },
  error => {
    my.hideLoading();
    return Promise.reject(error)
  }
);
// 增加format request config的拦截器
tinyAppHttp.interceptors.request.use(
  async config => {
      config.businessConfig.loading && my.showLoading({
        content: '正在加载'
      });
      return { ...config
      }
    },
    error => {
      return Promise.reject(error);
    }
);
/**
 *
 * @param {接口地址} url
 * @param {接口入参} data
 * @param {mock数据，on 开关， data，mock的数据} mock
 * @param {请求方式，默认get} method
 * @param {业务参数控制} businessConfig
 */
export async function request(
  url = '', // 请求地址
  data = {}, // 请求参数
  mock = {
    on: false, // 是否启用mock数据
    data: {} // mock 开启时返回该参数
  },
  method = 'get', // 请求方式
  businessConfig = {
    loading: true, // 请求接口是否需要loading
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }, // headers 定制传输
    urlType: 'default', // 多个接口地址时区分
    authType: false // 授权类型auth_base/auth_user
  }
) {
  if (mock.on) {
    return new Promise(resolve => {
      resolve(mock.data);
    });
  }
  let res = null
  url = getDomain(businessConfig.urlType) + url;
  try {
    if (businessConfig.authType === 'auth_base') {
      const {
        authCode
      } = await silenceAuthCode();
      data = { ...data,
        authCode
      };
    }
    res = await tinyAppHttp[method]({
      url,
      data,
      businessConfig
    })
    return {
      API_ERROR: false,
      ...res
    }
  } catch (e) {
    console.log('请求出错--------', { ...e,
      url
    })
  }
  console.log('请求结果--------', res);
  return res || {
    API_ERROR: true
  };
}