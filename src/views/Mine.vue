<template>
  <div>
    <NavBar>
      <div slot="title">我的</div>
    </NavBar>
    <!-- 登陆注册按钮 -->
    <div v-if="!showname">
      <van-button plain type="primary" to="Reg">注册</van-button>
      <van-button plain type="info" to="Login">登陆</van-button>
    </div>
    <div v-if="!showUser">
      <span>{{username}}</span>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import cookies from "js-cookie";
import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);
export default {
  data() {
    return {
      username:'',
      showname: false,
      showUser: true,
    };
  },
  components: {
    NavBar,
  },

  created() {
    this.$parent.showNav = true;
    // 获取用户名
    let showcookie = cookies.get("username");
    this.username = showcookie
    if (showcookie) {
      this.showname = true;
      this.showUser = false;
    } else {
      this.showname = false;
      this.showUser = true;
    }
  },
  methods: {},
};
</script>

<style>
</style>
