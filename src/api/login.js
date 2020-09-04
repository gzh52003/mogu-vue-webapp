import request  from './axiosFun';
import axios from 'axios'
// 登录接口 
export const login = data => request({ url: '/login', method: 'post', data })