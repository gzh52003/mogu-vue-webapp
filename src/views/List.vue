<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">我的订单</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>

    <van-card
      :num="item.cartNum"
      :price="item.lowNowPrice*item.cartNum"
      :title="item.title"
      :thumb="item.topImages[0]"
      v-for="item in orderlist"
      :key="item.iid"
      class="pic"
      @click-thumb.stop="gotoDetail(item.iid,$event)"
    >
      <template #footer>
        <van-button size="mini" color="red">取消订单</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Vue from "vue";
import { Card } from "vant";
import { mapState } from "vuex";
Vue.use(Card);

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      orderlist(state) {
        const res = state.cart.orderlist;
        console.log("res=", res);
        return res;
      },
    }),
    orderList() {
      return this.$store.state.cart.orderlist;
    },
  },
  created() {
    console.log(this.orderlist, 222);
    console.log(this.orderList.oldPrice);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mine",
      });
    },
  },

  components: {
    NavBar,
  },
};
</script>

<style>
</style>