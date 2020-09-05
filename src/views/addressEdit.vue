<template>
  <div>
    <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import Vue from "vue";
import areaList from "../assets/js/area.js";
import { AddressEdit, Area, Toast } from "vant";
Vue.use(AddressEdit);
Vue.use(Area);

export default {
  name: "addressEdit",
  data() {
    return {
      areaList,
      searchResult: [],
      AddressInfo: {
        //收货人信息初始值
        name: "", //姓名
        tel: "", //电话
        province: "", //省份
        city: "", //城市
        country: "", //区县
        areaCode: "", //地址code：ID
        addressDetail: "", //详细地址
        isDefault: true, //是否选择默认
      },
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push("/address");
    },
    onSave(e) {
      console.log(e);

      let data = {};
      data.name = e.name;
      data.tel = e.tel;
      data.address = e.province + e.city + e.country + e.addressDetail + "";
      data.addressDetail = e.addressDetail;
      data.areaCodeL = e.areaCode;
      data.postalCode = e.postalCode;
      data.isDefault = e.isDefault;

      console.log(data);
      let addressData = JSON.parse(localStorage.getItem("address")) || [];
      addressData.push(data);
      localStorage.setItem("address", JSON.stringify(addressData));
      this.$router.push("/address");
    },
    onDelete() {
      Toast("delete");
      this.$router.push("/address");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "万达广场",
            address: "郑州市二七区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>
.van-address-list__bottom {
  margin-bottom: 70px;
}
</style>
