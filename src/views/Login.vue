<template>
  <div class="login">
    <NavBar>
      <div slot="title">用户登陆</div>
      <router-link to="home" slot="right" class="van-nav-bar__text">首页</router-link>
    </NavBar>
    <div class="txt">
      <img src="../../public/img/logo.png" alt />
      <span>欢迎登陆</span>
    </div>

    <van-form @submit="onSubmit" :model="ruleForm" ref="ruleForm">
      <van-field
        v-model="ruleForm.username"
        type="text"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{validator:password, required: true, message: '请填写6-12位密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登陆</van-button>
      </div>
      <li>
        <router-link to="Reg">没账号?去注册</router-link>
        <van-checkbox v-model="checked" class="check">记住密码</van-checkbox>
      </li>
    </van-form>
  </div>
</template>

<script>
import crypto from "crypto";
import Vue from "vue";
import NavBar from "../components/NavBar";
import cookies from "js-cookie";
// import cookie from '../utils/Cookie'
import {
  Form,
  Field,
  Button,
  Notify,
  Checkbox,
  CheckboxGroup,
  Toast,
} from "vant";
import { login } from "../api/login";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Notify);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
export default {
  name: "Login",
  data() {
    return {
      checked: true,
      ruleForm: {
        //username和password默认为空
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    // this.$cookie.getCookie();
  },
  methods: {
    password(password) {
      return /^[0-9a-zA-Z]{6,12}$/.test(password);
    },
    phoneNumber(phone) {
      /^1[3456789]\d{9}$/.test(phone);
    },
    onSubmit(values) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const self = this;
      let md5 = crypto.createHash("md5");
      md5.update(self.ruleForm.password); //需要加密的密码
      let password = md5.digest("hex"); //password 加密完的密码

      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if (self.checked == true) {
        // console.log("checked == true");
        //传入账号名，密码，和保存天数3个参数
        // self.$cookie.setCookie(self.ruleForm.username, password, 7);
        cookies.set("username", self.ruleForm.username, { expires: 7 });
        cookies.set("password", password, { expires: 7 });
      } else {
        // console.log("清空Cookie");
        //清空Cookie
        // self.$cookie.clearCookie();
        cookies.remove("username");
        cookies.remove("password");
      }

      // 发送登陆请求
      login(values).then((res) => {
        if (res.meta.status === 200) {
          setTimeout(() => {
            let token = res.data.token;
            localStorage.setItem("token", token); //保存token
            this.$router.push({ path: "/home" });
            Notify({ type: "success", message: "登陆成功" });
          }, 1000);

          let name = cookies.get("username");
          if (name) {
            this.showname = true;
            this.showUser = false;
          } else {
            this.showname = false;
            this.showUser = true;
          }
        } else {
          Notify({ type: "danger", message: "登陆失败" });
        }
      });
    },
  },
  created() {},
  components: {
    NavBar,
  },
};
</script>

<style  scoped>
.login {
  align-items: center;
}
.txt {
  display: flex;
  text-align: center;
  align-items: center;
  padding: 20px 120px;
}
.txt > img {
  width: 80px;
  height: 80px;
}
.txt span {
  justify-items: center;
  font-size: 22px;
  padding-left: 5px;
}
li {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding-left: 10px;
}
.check {
  padding-right: 10px;
}
</style>
