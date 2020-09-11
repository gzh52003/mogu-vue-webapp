import request  from './axiosFun';

// 登录接口 
export const login = data => request({ url: '/login?'+data, method: 'get', data})