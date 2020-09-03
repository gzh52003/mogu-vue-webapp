import { request } from './request'

export function detailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 封装保存商品信息的对象
export class detailBaseData {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title,
        this.num = columns[0],
        this.collect = columns[1],
        this.price = itemInfo.lowPrice,
        this.oldPrice = itemInfo.oldPrice,
        this.discountDesc = itemInfo.discountDesc,
        this.discountBgColor = itemInfo.discountBgColor,
        this.services1 = services[0].name,
        this.services2 = services.slice(1)
    }
}

// 封装保存店铺信息的对象
export class detailShopsData {
    constructor(shopInfo,score) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.sells = shopInfo.cSells;
        this.goods = shopInfo.cGoods;
        this.allGoodsUrl = shopInfo.allGoodsUrl;
        this.score = score;
    }
}

// 请求推荐商品接口
export function recommend() { 
    return request({
        url:'recommend'
    })
}