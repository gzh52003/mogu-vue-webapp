<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      default-tag-text="默认"
      for="item in list"
      @add="onAdd"
      @edit="onEdit(item.id)"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList } from "vant";

Vue.use(AddressList);
export default {
  name: "Dizhi",
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

  methods: {
    onAdd() {
      this.$router.push({
        name: "Xiugai",
      });
    },
    onEdit(index) {
      this.$router.push("/xiugai" + index);
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
  margin-bottom: 70px;
}
</style>
