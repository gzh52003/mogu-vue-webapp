
import request from '../utils/request'
// import {Notify} from 'vant'

const cart = {
  // 添加命名空间
  // namespaced:true,
  // 共享的数据：类似组件中的data
  state: {
    goodslist: [],
    orderlist: []
  },
  getters: {
    totalPrice(state, getters) {
      console.log("getters=", getters);
      return state.goodslist.reduce((pre, item) => {
        // console.log(item.checked)
        if (item.checked) {
          console.log(pre + item.lowNowPrice * item.cartNum)
          return pre + item.lowNowPrice * item.cartNum
        }
        return pre
      }, 0) * 100;
    },
    test() {
      return 'cart'
    },
  },

  // 定义修改state的事件
  // 调用：this.$store.commit('add')
  mutations: {
    initCart(state, data) {
      state.goodslist = data;
    },
    // 添加商品到购物车
    add(state, goods) {
      state.goodslist.unshift(goods)
      console.log('add to cart', goods)
    },

    // 将购买商品加入到订单列表
    add2(state, order) {
      state.orderlist.push(...order)
      console.log('add to orderlist', state, order)
    },

    // 修改数量
    changecartNum(state, { iid, cartNum }) {
      console.log(state);
      console.log(iid, cartNum);
      state.goodslist = state.goodslist.map(item => {
        if (item.iid === iid) {
          console.log(item);
          item.cartNum = cartNum;
          // this.$store.commit('cartNum', cartNum++);
        }
        return item;
      });

      console.log(state.goodslist)
    },

    // 删除商品
    remove(state, iid) {
      state.goodslist = state.goodslist.filter(item => item.iid !== iid)
    },

    // 清空购物车
    clear(state) {
      state.goodslist = []
    }

  },
  actions: {
    // 根据库存数量来判断是否允许更改购物车商品数量
    // async changecartNumAsync(context,{iid,cartNums}){
    //     console.log('context=',context);
    //     // 发起ajax请求，获取当前商品的库存数量
    //     // 库存>=qty：允许修改购物车商品数量
    //     // 库存<qty：不允许增加购物车商品数量
    //     // const {data} = await request.get(`/goods/${_iid}/kucun`)
    //     // const kucun = data.data;
    //     // console.log('kucun=',kucun)

    //     // if(kucun<qty){
    //     //     Notify({ type: 'danger', message: '库存不足' })
    //     //     qty = kucun;
    //     // }
    //     context.commit('changecartNum', {iid, cartNums})
    // },
    async getCart() {
      const { data } = await request.get(`/cart`);
      // context.commit('initCart',data.data)
      console.log(data.data);
    }
  }
}

export default cart;