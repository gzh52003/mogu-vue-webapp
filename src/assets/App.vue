<template>
  <div id="app">
    <router-view/>
    
    <!-- 底部Tab -->
    <van-tabbar route>
      <van-tabbar-item replace v-for="item in menu" :key="item.path" :to="item.path" :icon="item.icon">{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Icon, Tabbar, TabbarItem } from "vant";
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data(){
    return{
      menu:[
        {
          title:'首页',
          icon:'wap-home-o',
          path:'/home',
        },
        {
          title:'发现',
          icon:'search',
          path:'/goods',
        },
        {
          title:'购物车',
          icon:'cart-o',
          path:'/cart',
        },
        {
          title:'我的',
          icon:'contact',
          path:'/mine',
        },
      ]
    }
  }
}
</script>
<style>

</style>
