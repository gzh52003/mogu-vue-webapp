import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart'
import common from './common'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const store = new Vuex.Store({
    // store模块化
    modules: {
        cart,
        common,
    },
    plugins: [createPersistedState()]
})

export default store;