import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from './utils/Cookie.js'
Vue.config.productionTip = false
Vue.prototype.$cookie = cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
