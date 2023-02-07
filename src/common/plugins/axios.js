import axios from 'axios'

const request = {}; // 请求的服务器的地址
const timeout = 300000; // 超时时间 300000(30s)
const basePath = process.env.VUE_APP_BASE_URL; // 接口地址
// 空的异步pending对象,避免触发then/catch. 会导致await锁死
Promise.pending = new Promise(() => {});

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: basePath,
  Authorization: '',
  withCredentials: false, // 是否允许跨域
  headers: {
    channel: '1103'
  },
  timeout // 设置超时时间
});

/**
 * 接口请求参数过滤，如数字都转账字符串上送
 */
function filterParams (params) {
  Object.keys(params).forEach((obj) => {
    if (!params[obj] || params[obj] === 'null' || params[obj] === 'NULL' || params[obj] === 'undefined' || typeof (params[obj]) === 'undefined') {
      params[obj] = '';
    } else {
      if (params[obj] && ((typeof params[obj] === 'number') && params[obj].constructor === Number)) {
        params[obj] = String(params[obj]);
      }
      if (params[obj] && ((typeof params[obj] === 'string') && params[obj].constructor === String)) {
        params[obj] = params[obj].trim();
      }
    }
  });
  return params;
}
/**
 * axios添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    const token = ''
    const language = localStorage.getItem('locale') === 'en' ? 'EN_US' : 'ZH_HK'
    // config['Content-Type'] = 'application/json'
    if (token) {
      config.headers.Authorization = `${token}`
    }
    if (language) {
      config.headers.language = `${language}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 封装post请求
 * @param {*} url：后端接口地址
 * @param {*} params: 后端接口需要上送的参数
 * @param {*} config：接口请求的额外配置参数
 * @returns
 */
 request.post = function (url, params = {}, config = {}) {
  console.log('request.post params:', params, config);
  params = filterParams(params);
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: params,
      config: config,
      headers: {
      }
    }).then(res => {
      resolve(res);
    }).catch(error => {
      console.log('request post error:', error);
      console.log('request post config1:', config);
      reject(error);
    });
  });
},

/**
 * axios添加响应拦截器
 */
service.interceptors.response.use(
  async (response) => {
    console.log("axios响应拦截器的数据：", response);
    if (response.status === 200) { // http请求成功'
      return response.data
    } else { // 请求发不通
      return Promise.reject(response.data);
    }
  },
  error => {
    if(error.code === 'ERR_NETWORK') {
      error.data = {
        name: '张三',
        age: '19',
        company: '广西测试公司'
      }
    }
    return Promise.reject(error);
  }
);
export default request;