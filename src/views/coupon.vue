<template>
  <div>
    <van-nav-bar title="我的优惠券" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-tabs v-model="activeName">
        <van-tab title="未使用" name="a">
          <div class="coupon">
            <div class="coupon-left">
              <div class="coupon-inner">
                <div class="coupon-money">
                  <span>¥</span>
                  <span class="sum">100.00</span>
                </div>
                <div class="coupon-condition">
                  <p>满200.00可用</p>
                </div>
              </div>
            </div>
            <div class="coupon-right">
              <div class="coupon-inner">
                <div class="coupon-time">
                  截止日期
                  <br />2020-12-31
                </div>
                <i class="coupon-circle top"></i>
                <i class="coupon-circle bottom"></i>
              </div>
            </div>
            <div class="coupon-light"></div>
          </div>
        </van-tab>
        <van-tab title="已使用" name="b">
          <div class="coupon coupon-diabled">
            <div class="coupon-left">
              <div class="coupon-inner">
                <div class="coupon-money">
                  <span>¥</span>
                  <span class="sum">100.00</span>
                </div>
                <div class="coupon-condition">
                  <p>满300.00可用</p>
                </div>
              </div>
            </div>
            <div class="coupon-right">
              <div class="coupon-inner">
                <div class="coupon-time">
                  截止日期
                  <br />2020-09-03
                </div>
                <i class="coupon-circle top"></i>
                <i class="coupon-circle bottom"></i>
              </div>
            </div>
            <div class="coupon-light"></div>
          </div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList, Toast, PullRefresh, Tab, Tabs } from "vant";
Vue.use(AddressList);
Vue.use(PullRefresh);
Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: "coupon",
  data() {
    return {
      isLoading: false,
      activeName: "a",
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

<style lang="scss" scoped>
.coupon {
  position: relative;
  background: #d51d27;
  color: #fff;
  width: 100%;
  height: 95px;
  line-height: 25px;
  overflow: hidden;
  margin-top: 15px;
}
.coupon-diabled {
  background: #c3c3c3;
  color: #666;
}
.coupon:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.coupon-money .sum {
  font-size: 25px;
}
.coupon-left {
  float: left;
  text-align: left;
  width: 60%;
  font-size: 12px;
  background: url() left center no-repeat;
}
.coupon-right {
  float: right;
  text-align: center;
  width: 40%;
  font-size: 14px;
  background: url() right center no-repeat;
}
.coupon-inner {
  padding: 10px 15px;
  height: 75px;
  position: relative;
}
.coupon-right .coupon-inner {
  border-left: 2px dashed rgba(255, 255, 255, 0.5);
}
.coupon-money,
.coupon-time {
  margin-top: 12px;
}
.coupon-circle {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #fff;
  position: absolute;
  left: -9px;
  border-radius: 50%;
}
.coupon-circle.top {
  top: -8px;
}
.coupon-circle.bottom {
  bottom: -8px;
}
.coupon-light {
  position: absolute;
  top: 20px;
  left: 20%;
  height: 150px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(-30deg);
}
</style>
