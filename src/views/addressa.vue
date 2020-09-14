<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">地址管理</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import Vue from "vue";
import NavBar from "../components/NavBar";
import { AddressList, Toast } from "vant";

Vue.use(AddressList);
export default {
  name: "addressa",
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem("addressa"));
  },
  components: {
    NavBar,
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: "addressEdit",
      });
    },
    onEdit(item, index) {
      console.log(index);
      console.log(item);
      Toast("编辑地址:" + index);
      this.$router.push({
        path: "addressEdit",
        query: {
          index,
        },
      });
    },
    onClickLeft() {
      this.$router.push({
        name: "Mine",
      });
    },
  },
};
</script>

<style>
.van-address-list__bottom {
  margin-bottom: 3.1rem;
}
.van-address-list {
  margin-bottom: 2.5rem;
}
</style>
