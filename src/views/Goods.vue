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
    NavBar
  },
  created() {
    this.$parent.showNav = true
  },
};
</script>

<style scoped>

</style>

