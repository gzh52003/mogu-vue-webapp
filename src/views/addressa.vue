<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">地址管理</div>
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
import { AddressList } from "vant";

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
    // onEdit(item, index) {
    //   console.log(index);
    //   console.log(item);
    //   this.name = content.name;
    //   this.phone = content.tel;
    //   this.province = content.province;
    //   this.city = content.city;
    //   this.region = content.county;
    //   this.detail_addr = content.addressDetail;
    //   this.group_message = content.isDefault;
    //   this.areaCode = content.areaCode;
    //   console.log(this.areaCode);
    //   // this.$router.push({
    //   //   path: "addressEdit",
    //   //   query: {
    //   //     index,
    //   //   },
    //   // });
    // },
    onClickLeft() {
      this.$router.push({
        name: "Mine",
      });
    },

    // onAdd() {
    //   Toast("新增地址");
    // },
    onEdit() {
      // console.log(index);
      // console.log(item);
      // this.name = item.name;
      // this.phone = item.tel;
      // this.province = item.province;
      // this.city = item.city;
      // this.region = item.county;
      // this.detail_addr = item.addressDetail;
      // this.group_message = item.isDefault;
      // this.areaCode = item.areaCode;
      // console.log(this.areaCode);
      // let data = {};
      // data.id = index;
      // data.name = content.name;
      // data.tel = content.tel;
      // data.address =
      //   content.province +
      //   content.city +
      //   content.country +
      //   content.addressDetail +
      //   "";
      // data.addressDetail = content.addressDetail;
      // data.areaCodeL = content.areaCode;
      // data.postalCode = content.postalCode;
      // data.isDefault = content.isDefault;
      // // console.log(data);
      // let addressData = JSON.parse(localStorage.getItem("addressEdit")) || [];
      // console.log(addressData);
      // addressData.push(data);
      // localStorage.setItem("addressEdit", JSON.stringify(addressData));
      // // console.log(content, 1);
      // // console.log(data, 2);
      // // console.log(index, 99);
      this.$router.push("/addressEdit");
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
