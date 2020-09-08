<template>
  <van-tree-select
    height="100%"
    style="text-align: center;"
    :items="items"
    :main-active-index.sync="active"
  >
    <template #content>
      <van-grid v-if="active === 0" :border="false" :column-num="1" >
        <van-grid-item  v-for="item in recommendone" :key="item._id" @click="gotoDea(item.iid)">
          <van-image :src="item.show.img" />
          <h4>{{item.title}}</h4>
          <p class="price">
            <del>{{item.orgPrice}}</del>
            <span>¥{{item.price}}</span>
          </p>
        </van-grid-item>
      </van-grid>
      <van-grid v-if="active === 1" :border="false" :column-num="2" >
        <van-grid-item v-for="item in recommendtwo" :key="item._id" @click="gotoDea(item.iid)">
          <van-image :src="item.image" />
          <h4>{{item.title}}</h4>
          <p class="price">
            <del>{{item.price}}</del>
            <span>{{item.discountPrice}}</span>
          </p>
        </van-grid-item>
      </van-grid>
    </template>
  </van-tree-select>
</template>
<script>
import Vue from "vue";
import {
  TreeSelect,
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

Vue.use(TreeSelect);
import { getHomeList } from "../api/home";
import { recommend } from "../api/detail";
export default {
  data() {
    return {
      active: 0,
      recommendone: [],
      recommendtwo: [],
      items: [
        { text: "正在热销" },
        { text: "上衣" },
        { text: "裙子" },
        { text: "裤子" },
        { text: "内衣" },
        { text: "女鞋" },
        { text: "男鞋" },
        { text: "包包" },
        { text: "运动" },
        { text: "配饰" },
        { text: "零食" },
      ],
    };
  },
  methods: {
    getHomeList() {
      getHomeList("sell", 1).then((res) => {
        this.recommendone = res.data.list;
        console.log(this.recommend);
      });
    },
    recommend(){
        recommend().then(res=>{
    //   console.log(this.recommend);
       this.recommendtwo=res.data.list
      })
    }
    
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
        iid,
      },
    });
  },
  created() {
    this.getHomeList();
    this.recommend();
  },
};
</script>
<style lang="scss">
</style>