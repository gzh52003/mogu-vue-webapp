import request  from './axiosFun';

// 注册
export const regUser = data => request({url:'/reg',method:'post',data})