import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '@/store/modules/userStore.js'
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  //
  plugins: [
    createVuexPersistedState({
      // 세션 스토리지에 해당 값을 저장해서 새로고침 시에도 로그인이 풀리지 않도록 한다.
      Storage: window.sessionStorage,
      // 로컬 스토리지에 저장
      // Storage: window.localStorage,
    }),
  ],
  modules: { userStore },
})
