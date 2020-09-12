import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: ' http://123.207.32.32:8000/api/h8/',
    timeout: 5000
  })

  //! 直接全局拦截，把数据过滤一下
  instance.interceptors.response.use(res => {
    return res.data
  })

  // 返回的就是promise 对象，在调用的时候可以直接使用
  return instance(config);
} 