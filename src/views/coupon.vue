<template>
  <div>
    <van-nav-bar title="我的优惠券" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" />
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList, Toast, PullRefresh, CouponList } from "vant";
Vue.use(AddressList);
Vue.use(PullRefresh);
Vue.use(CouponList);

const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "减免券",
  startAt: 1589104000,
  endAt: 1677877777,
  valueDesc: "1.5",
  unitDesc: "元",
};

export default {
  name: "coupon",
  data() {
    return {
      isLoading: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mine",
      });
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.van-coupon-list__bottom,
.van-checkbox {
  display: none;
}
</style>
