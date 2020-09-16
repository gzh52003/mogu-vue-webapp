<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">我的订单</div>
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
        <van-button size="mini" color="red" @click="remove(item.iid)">取消订单</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Vue from "vue";
import { Card, Dialog } from "vant";
import { mapState } from "vuex";
Vue.use(Card);
Vue.use(Dialog);

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      orderlist(state) {
        const res = state.cart.orderlist;
        // console.log("res=", res);
        return res;
      },
    }),
    orderList() {
      return this.$store.state.cart.orderlist;
    },
  },
  created() {
    console.log(this.orderlist, 222);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mine",
      });
    },

    Dialog(id) {
      this.$dialog
        .confirm({
          message: "您确定要取消订单嘛？",
          confirmButtonColor: "red",
        })
        .then(() => {
          console.log("点击了确认");
          this.people.splice(id, 1);
          console.log(this.orderlist);
          console.log(this.orderList[0].iid);
          console.log(this.item.iid);
        })
        .catch(() => {
          console.log("点击了取消");
        });
    },
    gotoDetail(id, event) {
      console.log("event.target=", event.target);
      console.log(event.target.className);
      if (event.target.className === "van-icon van-icon-success") {
        return;
      }
      this.$router.push("/goods/" + id);
    },
    remove(id) {
      this.$dialog
        .confirm({
          message: "您确定要取消订单嘛？",
          confirmButtonColor: "red",
        })
        .then(() => {
          console.log("点击了确认");
          console.log(id);
          this.orderList.splice(id, 1);
          console.log(this.orderList);
        })
        .catch(() => {
          console.log("点击了取消");
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