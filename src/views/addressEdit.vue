<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">编辑地址</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>
    <van-address-edit
      :address-info="addressInfo"
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
import NavBar from "../components/NavBar";
import areaList from "../assets/js/area.js";
import { AddressEdit, Area, Toast } from "vant";
import { mapGetters } from "vuex";
Vue.use(AddressEdit);
Vue.use(Area);

export default {
  name: "addressEdit",
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
    };
  },
  computed: {
    ...mapGetters(["address"]),
  },
  mounted() {
    const { index } = this.$route.query;
    console.log(this.$router.query);
    this.addressInfo = this.addressa[Number(index)];
  },
  components: {
    NavBar,
  },
  methods: {
    onClickLeft() {
      this.$router.push("/addressa");
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
      let addressData = JSON.parse(localStorage.getItem("addressa")) || [];
      addressData.push(data);
      localStorage.setItem("addressa", JSON.stringify(addressData));
      this.$router.push("/addressa");
    },
    onDelete(value) {
      Toast("delete");
      // this.$router.push("/addressa");
      console.log("删除地址", value);
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [];
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
