import {request} from './request'

// 轮播图等数据
export function getHomeData() {
  return request({
      url:'home/multidata'
  });
}

// 首页列表数据
// http://123.207.32.32:8000/api/h3/home/data?type=sell&page=1
export function getHomeList(type,page) { 
  return request({
      url: 'home/data',
      params: {
        type,page
      }
  })
}