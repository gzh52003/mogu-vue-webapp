<template>
  <div>
    <NavBar>
      <span slot="left" class="van-nav-bar__text">返回</span>
      <div slot="title">我的订单</div>
      <van-icon name="search" slot="right" size="18" />
    </NavBar>
    order 订单信息已存储在vuex orderlist 只需要渲染即可
    底部导航以及返回需要做处理
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import { mapState} from "vuex";
export default {
  data(){
    return{}
  },
  
  computed: {
    ...mapState({
      orderlist(state){
        const res = state.cart.orderlist;
        console.log('res=',res);
        return res
        
      }
    }),
    orderList() {
      return this.$store.state.cart.orderlist;
    },
  },
  created() {
    console.log(this.orderlist);
  },
  methods: {
    
  },
  
  components: {
    NavBar,
  },

};
</script>

<style>
</style>