<template>
  <div>
    <div>
      <h2>购物车</h2>
      <div class="location">
        <van-cell class="ddb" is-link @click="showPopup">永宁大街15号菜鸟驿站</van-cell>
        <!-- <van-popup v-model="show">内容</van-popup> -->
        <van-popup
          v-model="show"
          closeable
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '30%' }"
        >
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
          />
        </van-popup>
      </div>
    </div>
    <!-- 购物车 -->
    <van-card
      :price="item.sales_price"
      :title="item.goods_name"
      :thumb="item.img_url"
      v-for="item in goodslist"
      :key="item.iid"
      class="pic"
      @click-thumb.stop="gotoDetail(item.iid,$event)"
    >
      <template #tag>
        <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
      <template #price>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.sales_price}}</span>
          <van-stepper
            :value="item.cartNum"
            input-width="20px"
            button-size="20px"
            theme="round"
            async-change
            integer
            @change="changecartNum(item.iid,$event)"
          />
        </p>
      </template>
      <template #footer>
        <van-button plain size="mini" type="danger" icon="cross" @click.stop="removeItem(item.iid)"></van-button>
      </template>
    </van-card>

    <!-- 清空购物车 -->
    <div style="padding:10px;">
      <van-button color="rgb(247, 161, 175)" type="danger" size="small" @click="clearCart">清空购物车</van-button>
    </div>
    <!-- 提交订单计算总价格栏 -->
    <van-submit-bar
      :price="totalPrice"
      style="margin-bottom:50px"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>

    <!-- 郭斌斌接口数据推荐商品 -->
    <h4>推荐商品</h4>
    <van-grid :border="false" :column-num="2" class="recommendlist">
      <van-grid-item v-for="item in recommend" :key="item.iid" @click="gotoDea(item.iid)">
        <van-image :src="item.show.img" />
        <h4>{{item.title}}</h4>
        <p class="price">
          <del>{{item.orgPrice}}</del>
          <span>¥{{item.price}}</span>
        </p>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Card,
  Step,
  Steps,
  SubmitBar,
  Stepper,
  Popup,
  AddressList,
  Cell,
} from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
import { getHomeList } from "../api/home";
Vue.use(Card);
Vue.use(Step);
Vue.use(Steps);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(AddressList);

export default {
  name: "Cart",
  data() {
    return {
      show: false,
      active: 0,
      // checkAll:false,
      selecteds: [],
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
      // goodslist: [

      // ],
      recommend: [],
    };
  },
  computed: {
    // goodslist(){
    //   return this.$store.state.cart.goodslist
    // },

    //第一种映射方式只能映射同名的
    // 把vuex中state数据映射到组件的computed
    // ...mapState(['goodslist']),// 等效于：goodslist()=>this.$store.state.goodslist
    ...mapState({
      // 第二种映射方式可以映射不同名的
      // cartlist:'goodslist'  //  等效于cartlist()=>this.$store.state.goodslist

      // 第三种映射方式可以适用于加了命名空间后的情况
      // 映射模块化后的数据
      goodslist(state) {
        console.log("mapState=", state);
        console.log(state.goodslist);
        return state.cart.goodslist;
      },
    }),
    checkAll: {
      get() {
        return this.goodslist.every((item) => item.checked);
      },
      set(val) {
        this.goodslist = this.goodslist.map((item) => {
          item.checked = val;
          return item;
        });
      },
    },
    totalPrice() {
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.cartNum,0)*100;
      return this.$store.getters.totalPrice;

      // 添加命名空间的获取方式
      // return this.$store.getters['cart/totalPrice']
    },
  },
  methods: {
    getHomeList() {
      getHomeList("sell", 1).then((res) => {
        this.recommend = res.data.list;
        console.log(this.recommend);
      });
    },

    goto(path) {
      this.$router.push(path);
    },
    gotoDea(id) {
      // this.$router.push(`/goods/${id}`)
      // this.$router.push({
      //   name:'Goods',
      //   params:{
      //     id
      //   }
      // })
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    showPopup() {
      this.show = true;
    },
    onSubmit() {},
    gotoDetail(id, event) {
      console.log("event.target=", event.target);
      console.log(event.target.className);
      if (event.target.className === "van-icon van-icon-success") {
        return;
      }
      this.$router.push("/goods/" + id);
    },
    // async getData() {
    //   console.log(recommend)
    //   const {data} = await recommend();
    //   this.recommend = data.list;
    //   console.log(this.recommend)
    // },
    // removeItem(id){
    //   this.$store.commit('cart/remove',id)
    // },
    // clearCart(){
    //   this.$store.commit('clear')
    // },

    //第一种
    // ...mapMutations(['removeItem','clearCart']), //等效于上面的代码

    ...mapMutations({
      removeItem: "remove",
      clearCart: "clear",
    }),
    // changecartNum(id,cartNum){
    //   // this.$store.commit('changecartNum',{iid:id,cartNum})
    //   this.$store.dispatch('changecartNumAsync',{iid:id,cartNum})
    // }

    ...mapActions({
      // changecartNum:'changecartNumAsync'
      changecartNum(dispatch, iid, cartNum) {
        dispatch("changecartNumAsync", { iid, cartNum });
      },
    }),
  },
  created() {
    // this.$parent.showMenu = false;
    // console.log('goodslist=',this.$store.state)
    this.$store.commit("displayTabbar", true);
    // this.iid = this.$route.params.iid;
    console.log(this.iid);
    this.getHomeList();
  },
  beforeDestroy() {
    // this.$parent.showMenu = true;
    //  console.log('cart.destroyed',this.$parent.showMenu)
    this.$store.commit("displayTabbar", true);
  },
};
</script>
<style lang="scss">
h2 {
  font-size: 20px;
  // display: inline-block;
  text-align: center;
  font-weight: normal;
  margin-bottom: 2px;
}
.location {
  font-size: 12px;
  text-align: center;
  color: #999999;
  margin: 0px;
  .van-cell {
    text-align: center;
  }
}
.ddb {
  background: rgb(6, 247, 203);
}
</style>