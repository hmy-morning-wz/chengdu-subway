import { getAuthCode, silenceAuthCode } from './auth';

const TIMEOUT = 10000;
/**
 * 获取用户的Token信息并发送异步求情
 * @param {*} config
 * _request_ 的第一个参数必须是url
 */
function _request_(config) {
  let {
    url,
    method,
    data,
    headers,
    timeout,
    businessConfig
  } = config;
  if (headers['content-type'] && headers['content-type'].indexOf('application/json') > -1) {
    data = JSON.stringify(data)
  }
  
  console.log('请求地址----------', method, url);
  console.log('请求参数----------', data);
  console.log('请求头部----------', headers);
  return new Promise((resolve, reject) => {
    try {
      my.request({
        url,
        method,
        headers,
        data,
        timeout: timeout || TIMEOUT,
        success: res => {
          resolve(res);
        },
        fail: error => {
          reject(error);
        }
      })
    } catch (e) {
      reject(e);
    }
  });
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected, autoAddAuth = false) {
    this.handlers.unshift({
      fulfilled: fulfilled,
      rejected: rejected,
      isAutoAuth: autoAddAuth
    });
    return this.handlers.length - 1;
  }
  forEach(fn) {
    const newHandles = [];
    this.handlers.forEach(h => {
      if (h !== null) {
        fn(h);
      }
      if (!h.isAutoAuth) {
        newHandles.push(h);
      }
    });
    this.handlers = newHandles;
  }
}

function dispatchRequest(config) {
  // 这里是请求的真正发起地方返回promise
  return _request_(config).then(
    response => {
      // TODO format response data
      return response;
    },
    reason => {
      return Promise.reject(reason);
    }
  );
}

export default class TinyAppHttp {
  constructor(instanceConfig) {
    /*
    * instanceConfig 参数
    * bizCode NOTNULL
    * exitAppWhenRefuseAuth Boolean 拒绝授权时退出app
    */
    // if (!instanceConfig.bizCode) {
    //   throw new Error('bizCode不可以为空');
    // }
    this.defaults = Object.assign(
      {
        exitAppWhenRefuseAuth: true
      },
      instanceConfig
    );
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  autoAddAuthorization(config, autoAddAuth) {
    this.interceptors.response.use(
      async response => {
        let {
          data: { code }
        } = response;
        code = (code || '').toUpperCase();
        let silenceRes = {};
        if (code === 'DENY' || code === 'DENY_TOKEN') {
          console.log('------正在进行授权------');
          if (code === 'DENY') {
            try {
              silenceRes = await silenceAuthCode();
              console.log('------静默授权成功------');
            } catch (e) {
              console.log('------静默授权失败------', e);
            }
            const { authCode } = silenceRes;
            config.authCode = authCode;
            config.scope = 'auth_base';
          } else {
            try {
              silenceRes = await getAuthCode();
              console.log('------主动授权成功------');
            } catch (e) {
              console.log('------主动授权失败,即将退出------', e);
              this.defaults.exitAppWhenRefuseAuth && my && my.call('exitApp');
            }
            const { authCode } = silenceRes;
            config.authCode = authCode;
            config.scope = 'auth_user,auth_industry';
          }
          try {
            if (config.authCode && config.scope) {
              response = await _request_(config);
            }
          } catch (e) { }
        }
        return response;
      },
      error => {
        return Promise.reject(error);
      },
      autoAddAuth
    );
  }
  request(config) {
    // 参数结构({url: '', data: {}, method: '', headers: {}})
    const { businessConfig } = config;
    if (typeof config === 'string') {
      config = {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
    // 合并参数
    config = { ...this.defaults, ...config };
    config.method = config.method ? config.method.toLowerCase() : 'get';
    config.headers = businessConfig.headers || {};
    config.data = config.data || {};
    // 加上权限验证的拦截器
    // autoAddAuth && this.autoAddAuthorization(config, autoAddAuth);
    // 载入拦截器
    let chain = [dispatchRequest, undefined];
    let promise = Promise.resolve(config);
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
}

['get', 'post'].forEach(method => {
  TinyAppHttp.prototype[method] = function(config) {
    config.method = method;
    return this.request(config)
  };
});
