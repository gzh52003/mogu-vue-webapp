<template>
  <div>
    <NavBar>
      <div slot="title">我的</div>
    </NavBar>
    <!-- 登陆注册按钮 -->

    <div class="box">
      <div class="imgbox">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" v-if="!showUser" />
      </div>
      <div v-if="!showUser" class="notetxt">
        <span>{{username}}</span>
      </div>
      <div v-if="!showname">
        <van-button type="primary" to="Reg">注册</van-button>
        <van-button type="info" to="Login">登陆</van-button>
      </div>
      <van-button v-if="!showUser" type="danger" @click="out()">退出</van-button>
    </div>
    <div class="user-order">
      <h3 class="order__title">
        <p class="order__title__navigate">
          <span>余额：</span>
          <i class="mon">0.00</i>
        </p>
        <p class="order__title__navigate">
          <span>全部订单</span>
        </p>
      </h3>
      <div class="order__bd">
        <div v-for="(item,idx) in orderList" :key="idx" class="order__bd__item">
          <van-icon :name="item.icon" size="25" color="rgb(221, 221, 221)" :badge="item.count" />
          <span class="name" color="rgb(148, 142, 142)">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="user-tools">
      <van-cell title="地址管理" is-link to="address" />
      <van-cell title="我的优惠券" is-link to="coupon" />
      <van-cell title="余额充值" is-link />
      <van-cell title="设置" is-link />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import cookies from "js-cookie";
import Vue from "vue";
import { Cell, CellGroup, Image as VanImage, Button, Icon } from "vant";
Vue.use(VanImage);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
export default {
  name: "Mine",
  data() {
    return {
      username: "",
      showname: false,
      showUser: true,
      orderList: [
        {
          icon: "pending-payment",
          name: "待支付",
          count: "",
        },
        {
          icon: "peer-pay",
          name: "待发货",
          count: "",
        },
        {
          icon: "logistics",
          name: "待收货",
          count: "",
        },
        {
          icon: "chat-o",
          name: "售后",
          count: "",
        },
      ],
    };
  },
  components: {
    NavBar,
  },

  created() {
    this.$parent.showNav = true;
    // 获取用户名
    let showcookie = cookies.get("username");
    this.username = showcookie;
    if (showcookie) {
      this.showname = true;
      this.showUser = false;
    } else {
      this.showname = false;
      this.showUser = true;
    }
  },

  methods: {
    out() {
      cookies.remove("username");
      cookies.remove("password");
      setTimeout(() => {
        location.reload(); // 强制刷新
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  margin-bottom: 5px;
  position: relative;
  background: pink;
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-right: 1rem;
  margin-bottom: 0;
}
.imgbox {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #fff;
  margin-right: 20px;
}
.van-image {
  width: 50px;
  height: 50px;
}
.van-image > img {
  width: 50px;
  height: 50px;
}
.notetxt {
  position: absolute;
  align-items: center;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 2rem;
  height: 50px;
  display: flex;
  align-items: center;
}
.order__title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: pink;
  margin: 0;
  padding: 1rem;
}
.order__title__title,
.order__title__navigate {
  border: 0.1rem solid rgb(250, 203, 211);
  padding: 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
}
.order__bd {
  display: flex;
  justify-content: space-around;
  background: pink;
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.order__bd__item {
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 100%;
  background: rgb(6, 247, 203);
  padding: 0.5rem;
}
.name {
  font-size: 12px;
}
.van-icon {
  font-size: 10px;
}
.user-tools {
  margin-top: 1rem;
}
.van-cell {
  margin: 1rem 0;
  background: pink;
}
.order__title__navigate > span {
  display: flex;
  align-items: center;
}
</style>
