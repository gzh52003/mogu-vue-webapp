<template>
  <div class="goods">
    <NavBar class="navBar">
      <span slot="left" class="van-nav-bar__text" @click="goback">返回</span>
      <div slot="title">shops</div>
    </NavBar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" height="400">
      <van-swipe-item v-for="(item, index) in banners" :key="index" class="img">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>

    <div class="goods-info">
      <h1>{{title}}</h1>
      <p class="price">
        <del>¥{{delprice}}</del>
        <span>{{price}}</span>
        <i>{{columns[0]}}</i>
        <b>{{columns[1]}}</b>
      </p>
    </div>
    <!-- <van-cell is-link @click="showPopup" class="upshow">参数 厂名 尺码 衣长...</van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      
    </van-popup>-->
    <img v-for="img in imageList" :key="img" v-lazy="img" class="shopImg" />
    <!-- 推荐 -->
    <!-- <h4 class="tj_title">推荐商品</h4> -->
    <van-divider :style="{ padding: '0 20px',}" class="text">推荐商品</van-divider>
    <van-grid :border="true" :column-num="2" :gutter="10">
      <van-grid-item v-for="(itm,index) in recommends" :key="index" @click="gotogoods(itm.iid)">
        <van-image :src="itm.show.img" />
        <h4>{{itm.title}}</h4>
        <p class="price">
          <del>{{itm.orgPrice}}</del>
          <span>{{itm.price}}</span>
        </p>
      </van-grid-item>
    </van-grid>
    <!-- 加入购物车按钮 -->
    <van-goods-action class="goods_action" >
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartlist.length"
        @click="goto('/cart')"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" badge />
      <van-goods-action-button type="warning" @click="add2cart(iid)" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow(iid)" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Icon,
  Grid,
  GridItem,
  Image,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Lazyload,
  Popup,
  Divider,
} from "vant";
import NavBar from "../components/NavBar";
import { detailData } from "../api/detail";
import { getHomeList } from "../api/home";
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(Divider);
export default {
  components: {
    NavBar,
  },

  name: "Goods",
  data() {
    return {
      data: {},
      recommends: [],
      banners: [],
      title: [],
      price: [],
      delprice: [],
      imageList: [],
      columns: [],
      iid: "",
      // show: false,
    };
  },
  watch: {},
  created() {
    // this.detailData();

    console.log('route',this.$route);
    this.iid = this.$route.params.id;
    // const id = this.iid;
    console.log(this.iid);
    detailData(this.iid).then((res) => {
      this.banners = res.result.itemInfo.topImages;
      this.title = res.result.itemInfo.title;
      this.price = res.result.itemInfo.price;
      this.delprice = res.result.itemInfo.highPrice;
      this.imageList = res.result.detailInfo.detailImage[0].list;
      this.columns = res.result.columns;
      console.log(res);
      this.data = res.result.itemInfo
    });
    getHomeList("pop", 1).then((res) => {
      this.recommends = res.data.list;
      console.log(this.recommends);
    });
  },
  computed: {
    cartlist() {
      return this.$store.state.cart.goodslist;
    },
  },
  methods: {
    // 返回前一页
    goback() {
      this.$router.go(-1);
    },
    goto(path) {
      this.$router.push(path);
    },

    gotogoods(id){
      this.goto({
        name:'Goods',
        params:{
          id
        }
      })
    },
  
    // showPopup() {
    //   this.show = true;
    // },
    
    add2cart() {
      // 添加当前商品到购物车;
      // 判断当前商品是否已经存在购物车中
      // 存在：数量+1
      // 不存在：添加到购物车
      // const iid = this.$route.params.id;
      const {iid} = this.data;
      console.log(iid);
      const current = this.cartlist.filter((item) => item.iid === iid)[0];
      console.log(current);
      if (current) {
        
        this.$store.commit("changecartNum", { iid, cartNum: current.cartNum + 1 });
        
      } else {
        console.log(6666);
        const goods = {
          ...this.data,
          cartNum: 1,
        };
        console.log(goods);
        // 调用mutation方法
        this.$store.commit("add", goods);
      }
    },
    
    buyNow(id) {
      // 添加当前商品到购物车，并跳转到购物车页面
      this.add2cart();
      console.log("iid", id);
      this.$router.push("/cart");
      
    },
  },
  mounted() {
      // 控制菜单显示
      this.$store.commit("displayTabbar", false);
    },
    destroyed() {
      this.$store.commit("displayTabbar", true);
    },
};
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  .navBar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 334;
  }
}
.img {
  img {
    width: 100%;
    height: 100%;
  }
}
.goods-info {
  h1 {
    font-size: 16px;
    padding: 0 10px;
  }
  .price {
    span {
      font-size: 18px;
      font-weight: bold;
      color: red;
      padding-right: 25px;
    }
    del {
      color: #999;
      padding: 0 10px;
    }
    i {
      font-style: normal;
      font-size: 14px;
      padding-right: 15px;
    }
    b {
      font-weight: 400;
      font-size: 12px;
    }
  }
}
.shopImg {
  display: block;
  width: 100%;
  height: 50%;
}
.goods_action {
  z-index: 333;
}
</style>