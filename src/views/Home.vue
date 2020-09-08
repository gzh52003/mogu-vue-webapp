<template>
  <div class="home">
    <NavBar>
      <div slot="title">购物街</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" height="215">
      <van-swipe-item v-for="(item, index) in banners" :key="index" class="img">
        <img v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="4" icon-size="64" class="nav">
      <van-grid-item
        v-for="item in recommends"
        :key="item.title"
        :icon="item.image"
        :text="item.title"
      />
    </van-grid>

    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 20px',}"
      class="text"
    >新势力</van-divider>

    <van-tabs v-model="active" class="goodslist">
      <van-tab v-for="item in title" :key="item.title" :title="item.title">
        <van-grid :border="true" :column-num="2" :gutter="10">
          <van-grid-item v-for="(itm,index) in goodsList" :key="index" @click="gotogoods(itm.iid)">
            <van-image :src="itm.show.img" />
            <h4>{{itm.title}}</h4>
            <p class="price">
              <del>{{itm.orgPrice}}</del>
              <span>¥{{itm.price}}</span>
            </p>
            <p class="sale">月销 {{itm.sale}}件</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
// import Good from"../components/goods"
import Vue from "vue";
import {
  Lazyload,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Divider,
  Tab,
  Tabs,
  Image as VanImage,
} from "vant";
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
import { getHomeData, getHomeList } from "../api/home";
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      keywords: [],
      dKeywords: [],
      goodsList: [],
      pop: [],
      new: [],
      sell: [],
      goods: {
        // 默认请求第一页
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      title: [],
      active: 0,
      currentType: "pop",

      NavControlOffsetTop: 0,
      NavControlIsFlixed: false,
      saveY: 0,
      homeImgListener: null,
    };
  },
  computed: {
    showGoods() {
      // 决定当前渲染哪个小导航页
      return this.goods[this.currentType].list;
    },
  },
  components: {
    NavBar,
  },
  created() {
    this.getHomeData();
    // 请求首页列表内容
    this.getHomeList("pop");
    this.getHomeList("new");
    this.getHomeList("sell");
    console.log(this.active)
  },
  methods: {
    getHomeData() {
      getHomeData().then((res) => {
        this.banners = res.data.banner.list;

        this.recommends = res.data.recommend.list;
        console.log(this.recommends);
        this.keywords = res.data.keywords.list;
        this.dKeywords = res.data.dKeyword.list;
      });
    },

    getHomeList(type) {
      let page = ++this.goods[type].page;
      getHomeList(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
        this.title = res.data.filter.list;
        this.goodsList = this.goods[type].list;
        console.log(this.goods[type].list);
        
      });
    },
    gotogoods(id) {
      // this.$router.push('/goods/'+id)
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.img img {
  width: 100%;
  height: 100%;
}
.nav {
  border-bottom: 10px solid #ccc;
}
.text {
  font-size: 20px;
}
.goodslist {
  
  h4 {
    font-size: 14px;
  }
}
.price {
  color: red;
  margin: 0 0 5px;
  del {
    padding-right: 5px;
    color: #999;
  }
}
.sale{
  margin: 0;
  font-size: 12px;
  color: #999;
}
</style>
