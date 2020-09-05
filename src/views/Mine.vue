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
    
    <div class="box">
      <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div v-if="!showUser" class="notetxt">
      <span>{{username}}</span>
      </div>
    </div>
    <van-cell title="地址管理" is-link to="dizhi" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import cookies from "js-cookie";
import Vue from "vue";
import { Cell, CellGroup, Image as VanImage, Button } from "vant";
Vue.use(VanImage);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  name: "Mine",
  data() {
    return {
      username: "",
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
    this.username = showcookie;
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
.box {
  display: flex;
  padding-left: 1rem;
  margin-bottom: 5px;
  position: relative;
}
.van-image {
  width: 50px;
  height: 50px;
}
.van-image > img {
  width: 50px;
  height: 50px;
}
.notetxt{
  position: absolute;
  align-items: center;
  left: 30%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
