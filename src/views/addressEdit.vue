<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text" @click="onClickLeft">返回</span>
      <div slot="title">编辑地址</div>
    </NavBar>
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-postal
      show-delete
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
  // created() {
  // this.addressInfo = JSON.parse(localStorage.getItem("addressEdit"));
  // console.log(localStorage.getItem("addressEdit"));
  // console.log(this.addressInfo, 4);
  // console.log(this.addressInfo, 50);
  // },
  mounted() {
    const { index } = this.$route.query;
    console.log(this.$router.query);
    this.addressInfo = this.addressa[Number(index)];
    console.log(this.addressInfo);
  },
  components: {
    NavBar,
  },

  methods: {
    onClickLeft() {
      this.$router.push("/addressa");
    },
    onSave(content) {
      console.log(content);

      let data = {};
      data.name = content.name;
      data.tel = content.tel;
      data.address =
        content.province +
        content.city +
        content.country +
        content.addressDetail +
        "";
      data.addressDetail = content.addressDetail;
      data.areaCodeL = content.areaCode;
      data.postalCode = content.postalCode;
      data.isDefault = content.isDefault;

      console.log(data);
      let addressData = JSON.parse(localStorage.getItem("addressa")) || [];
      console.log(addressData);
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
