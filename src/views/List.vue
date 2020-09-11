<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text">返回</span>
      <div slot="title">list</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
</style>