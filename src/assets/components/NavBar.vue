<template>
  <div class="Nav">
    <van-nav-bar>
      <slot slot="left"  name="left"></slot>
      <slot slot="title" name="title"></slot>
      <slot slot="right" name="right"></slot>
    </van-nav-bar>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Vue from "vue";
import { NavBar, Icon} from "vant";
Vue.use(NavBar);
Vue.use(Icon);
export default {
  name:'NavBar'
}
</script>

<style lang="scss" scoped>

</style>
