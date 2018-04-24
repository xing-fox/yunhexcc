import Vue from 'vue'
import Vuex from 'vuex'

import Loading from './modules/loading'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Loading
  },
  strict: process.env.NODE_ENV !== 'production'
})
