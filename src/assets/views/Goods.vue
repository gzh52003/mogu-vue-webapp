<template>
  <div class="goods">
    <NavBar>
      <span slot="left" class="van-nav-bar__text">返回</span>
      <div slot="title">goods</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>

    <!-- 商品展示
    <van-grid :border="true" :column-num="2">
      <van-grid-item v-for="item in img" :key="item" class="goodslist">
        <van-image :src="item.url" />
        <h4>{{item.title}}</h4>
        <p>{{item.price}}</p>
      </van-grid-item>
    </van-grid> -->
  </div>
</template>

<script>
// import Vue from "vue";
// import { Icon, Grid, GridItem,Image} from "vant";
import NavBar from "../components/NavBar";
// Vue.use(Icon);
// Vue.use(Grid);
// Vue.use(GridItem);
// Vue.use(Image)

export default {
  components: {
    NavBar,
  },
  // data(){
  //   return{
  //     img:[
  //       {
  //         url:'https://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1599569515&t=d41132bd2dde75dea12663be0dfdf03f',
  //         title:'美女艺术照',
  //         price:'188'
  //       },
  //       {
  //         url:'https://img.yzcdn.cn/vant/apple-2.jpg',
  //         title:'苹果电脑',
  //         price:'18877'
  //       },
  //       {
  //         url:'https://img.yzcdn.cn/vant/apple-3.jpg',
  //         title:'ipad',
  //         price:'5999'
  //       },
  //     ]
  //   }
  // }
};
</script>

<style scoped>

</style>

