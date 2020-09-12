import axios from 'axios'

// import qs from 'qs'

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://121.36.201.222:2020/api',
    timeout: 5000
  })
    
  // 添加请求拦截器，在请求头中加token
  // instance.interceptors.request.use(function (res) {
    
  //   // let token = window.localStorage['token']
  //   // if(token){
  //   //   res.headers['Authorization'] = token
  //   // }
  //   return res
  // }, function (error) {
  //   return Promise.reject(error)
  // })

  // instance.interceptors.response.use(res => {
  //   // let status = res.data.meta.status
  //   // let status2 = res.data.meta.msg;
  //   // // let resetTime = localStorage.getItem("resetTime")
  //   // // let token = localStorage.getItem('token')
  //   // if (status !== 200 && status !== 201 && status2 !== 200) {
  //   //   // message.error('出错了，' + res.data.meta.msg)
  //   //   console.log(res);

  //   // }
  //   return res.data
  // })

  return instance(config);
}
