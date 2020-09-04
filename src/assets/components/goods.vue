<template>
  <div class="good-wrap">
    <GoodsItem v-for="(item,index) in goods" :key="index" :goodsitem="item" class="good-item" />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style  scop>
.good-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: #efefef;
}
.good-item {
  width: 46%;
}
</style>