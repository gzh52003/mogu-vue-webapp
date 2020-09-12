<template>
  <div class="reg">
    <NavBar>
      <div slot="title">用户注册</div>
      <router-link to="home" slot="right" class="van-nav-bar__text">首页</router-link>
    </NavBar>
    <div class="txt">
      <img src="../../public/img/logo.png" alt />
      <span>用户注册</span>
    </div>
    <van-form @submit="onSubmit" :model="ruleForm" ref="ruleForm">
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        @change="myChange"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{validator:password, required: true, message: '请填写6-12位密码' }]"
      />
      <van-field
        v-model="ruleForm.email"
        type="text"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{validator:email, required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="ruleForm.mobile"
        type="text"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{validator:mobile, required: true, message: '请填写11位手机号' }]"
      />
      <van-field
        v-model="ruleForm.sms"
        name="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
      <li>
        <router-link to="Login">已有账号?去登陆</router-link>
      </li>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import NavBar from "../components/NavBar";
import { Form, Field, Button, Notify } from "vant";
import { regUser } from "../api/reg";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Notify);
export default {
  name: "Reg",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        sms: "",
      },
    };
  },
  methods: {
    password(password) {
      return /^[0-9a-zA-Z]{6,12}$/.test(password);
    },
    mobile(mobile) {
      return /^1[3456789]\d{9}$/.test(mobile);
    },
    email(email) {
      return /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
        email
      );
    },
    onSubmit(values) {
      regUser(values).then((res) => {
        // console.log(res);
        // console.log(res);
        if (res.data.code === 1) {
          Notify({ type: "success", message: "注册成功" });
          this.$router.push({ path: "/login" });
        }
      });
    },
    async myChange() {
      const result =await fetch(
        `http://121.36.201.222:2020/api/reg/check?username=${this.ruleForm.username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      console.log("result=", result);

      if (result.code === 1) {
        // username.className = "form-control is-invalid";
        // canReg = false;
        Notify({ type: "warning", message: "用户已存在" });
        
      } else if (result.code === 0) {
        // username.className = "form-control is-valid";
        // canReg = true;
        Notify({ type: "success", message: "该用户名可用" });
      }
    },
  },

  components: {
    NavBar,
  },
};
</script>NavBar

<style scoped>
.reg {
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
  justify-content: end;
  list-style: none;
  padding-left: 10px;
}
</style>
