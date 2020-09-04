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
// import areaList from "../router/area";
import { AddressEdit, Area, Toast } from "vant";
Vue.use(AddressEdit);
Vue.use(Area);

export default {
  name: "Xiugai",
  data() {
    return {
      areaList: [],
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onClickLeft() {
      this.$router.push({
        name: "Dizhi",
      });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
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
