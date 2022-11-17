<template>
  <div>
    <div id="bg">
      <div id="main">
        <div id="main2">
          <div id="left">
            <h1>HELLO!!✋</h1>
            <br />
            <br />
            <div>
              <input
                type="text"
                id="userid"
                name="userId"
                placeholder="ID"
                v-model="loginInfo.id"
              />
              <br />
              <input
                type="password"
                id="userpwd"
                name="userPwd"
                placeholder="Password"
                v-model="loginInfo.pass"
              />
            </div>
            <br />
            <br />
            <button @click="login">로그인</button>
          </div>
          <div id="right">
            <img
              src="@/assets/login.jpg"
              alt="로그인 사진"
              width="100%"
              style="border-radius: 50px;"
            />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loginInfo: {},
    }
  },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('userStore/login', this.loginInfo)
        alert('로그인 성공')
        this.$router.push('/').catch(() => {}) //홈 화면 이동
      } catch (error) {
        alert('로그인 실패')
      }
    },
  },
}
</script>

<style>
#bg {
  background-color: #08250b;
}
#main {
  background-color: white;
  margin: 0px 300px 0px 300px;
  height: 700px;
  border-radius: 50px;
  color: #000;
}
#main2 {
  /* display: flex;
  align-items: center; */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#left {
  width: 601px;
  height: 700px;
  margin: 0px 15px 0px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#right {
  width: 701px;
  height: 700px;
  margin: 0px 25px 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-weight: 700;
}

input {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: 1px solid lightgrey;
}

button {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #ff9a16;
  background-color: #ff9a16;
  line-height: 10px;
}

#userid {
  width: 581.5px;
}
</style>
