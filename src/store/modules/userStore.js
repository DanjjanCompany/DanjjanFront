import http from '@/util/http'
import router from '@/router'
import jwt_decode from 'jwt-decode'
const userStore = {
  namespaced: true,
  state: () => ({
    userInfo: {}, //로그인한 유저 정보
    users: [], //유저 목록 데이터
    user: {}, //유저 하나의 데이터
    token: null,
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token
    },
    SET_USERS(state, payload) {
      state.users = payload
    },
    SET_USER(state, payload) {
      state.user = payload
      console.log('payload : ', state.user)
    },
  },
  actions: {
    async login({ commit }, loginInfo) {
      let { data } = await http.post('/users/login', loginInfo)
      let token = data.token
      console.log('발급받은 토큰 : ', token)

      // userStore에 토큰 정보 저장
      commit('SET_TOKEN', { token })

      // axios 요청시 header에 access-token 추가
      // http.defaults.headers.common['access-token'] = token

      // 받은 토큰 decode
      let decodedToken = jwt_decode(token)
      // console.log("토큰 정보 : ", decodedToken);

      // vuex에 userInfo 정보 세팅
      const { id, name } = decodedToken
      commit('SET_USER_INFO', { id, name })
    },
    logout({ commit }) {
      // userStore에 token 정보 지우기
      commit('SET_TOKEN', { token: null })

      // 헤더에서 토큰 정보 제거
      // 전부 대괄호로 작성할 수 있음, access-token의 하이픈 부분 때문에 아래처럼 기입
      // delete http.defaults.headers.common['access-token']
      // vuex store의 유저정보 비우기
      commit('SET_USER_INFO', {})
    },

    async setUsers(context) {
      const { data } = await http.get('/users')
      console.log(data)
      if (data == 'not Login') {
        alert('로그인 해주세요.')
        router.push('/')
        return
      }
      //mutations를 통해 books 세팅
      //context.commit(메소드명, 전달할데이터)
      context.commit('SET_USERS', data)
    },
    async setUser(context, userId) {
      const { data } = await http.get(`/users/${userId}`)
      console.log(data)
      if (data == 'not Login') {
        alert('로그인 해주세요.')
        router.push('/')
        return
      }
      //mutations를 통해 books 세팅
      //context.commit(메소드명, 전달할데이터)
      context.commit('SET_USER', data)
    },
  },
}

export default userStore
