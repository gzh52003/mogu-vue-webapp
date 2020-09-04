<template>
<!-- <a :href="goodsitem.link"> -->
    <div class="goods" @click="goodClick">
        <img v-lazy="showImg" alt="" @load="imgLoad">
        <div class="goods-info">
            <p>{{goodsitem.title}}</p>
            <span class="price">￥{{goodsitem.price}}</span>
            <span class="collect"> {{ goodsitem.cfav}}</span>
        </div>
    </div>
<!-- </a> -->
  
</template>

<script>
export default {

  components: {},
  props:{
      goodsitem:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  data() {
    return {
        imgLength:0,
        counter:0
    };
  },
  computed: {
    showImg(){
      return  this.goodsitem.image || this.goodsitem.show.img
    }
  },
  watch: {
    goodsitem(){
      return this.imgLength=this.goodsitem.length;
    }
  },
  methods: {
    imgLoad(){// 图片加载完向主页发射图片加载完成事件
      this.$bus.$emit('imgLoad');
    },
    goodClick(){
      this.$router.push('/detail/'+this.goodsitem.iid)
    }
  },
};
</script>
<style  scoped>
  .goods {
    padding-bottom: 66px;
    margin-bottom: 10px;
    position: relative;
    background: #fff;
    border-radius: 3px;
  }
  .goods img {
    width: 100%;
    
  }

  .goods-info {
    font-size: 12px;
    overflow: hidden;
    text-align: left;
    margin:3px 8px;
    position: absolute;
    bottom: 0;
  }

  .goods-info p {
    text-overflow: ellipsis;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-bottom: 5px;
    line-height: 18px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
    font-size: 16px;
    font-weight: bolder;
  }

  .goods-info .collect {
    position: relative;
    float: right;
    margin-right: 20px;
    line-height: 16px;
    margin-bottom: 5px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    right: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>