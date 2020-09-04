<template>
  <div>
    <NavBar>
      <div slot="title">购物车</div>
    </NavBar>
    Cart
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  components:{
    NavBar
  },
  created() {
    this.$parent.showNav = true
  },
}
</script>

<style>

</style>
