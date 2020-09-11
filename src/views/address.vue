<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      for="item in list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList, Toast } from "vant";

Vue.use(AddressList);
export default {
  name: "address",
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem("address"));
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
        name: "addressEdit",
        params: { index },
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
