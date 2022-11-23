<template>
  <div id="navV">
    <nav class="navbar navbar-expand-lg aaa">
      <div class="container-fluid">
        <div>
          <ul class="navbar-nav ml-auto">
            <router-link to="/">
              <img src="@/assets/ssafy_logo.png" alt="싸피 로고" width="90px" />
            </router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <li
              class="nav-item"
              style="margin-top: 7px; visibility: hidden;"
              v-if="userInfo.id"
            >
              <span>{{ userInfo.id }}님 환영합니다.</span>
            </li>
          </ul>
        </div>
        <div class="" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'create' }" class="nav-link">
                유저 등록
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'user' }"
                class="nav-link"
                style="text-align: center;"
              >
                유저 목록
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'house' }"
                class="nav-link"
                style="text-align: center;"
              >
                실거래가 조회
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'loginPage' }" class="nav-link">
                로그인 페이지
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'board' }" class="nav-link">
                게시판
              </router-link>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav ml-auto">
          <li v-if="!userInfo.id" class="nav-item" style="visibility: hidden;">
            <a href="#" @click.prevent="loginModal.show()">로그인</a>
          </li>
          <template v-else>
            <li class="nav-item">
              <a href="#" @click.prevent="logout" style="padding: 8px;">
                로그아웃
              </a>
            </li>
            <li class="nav-item" style="margin-top: 7px;">
              <span>{{ userInfo.id }}님 환영합니다.</span>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- Modal Start -->
    <div class="modal fade" id="loginModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">로그인</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="id">id</label>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  v-model="loginInfo.id"
                  required
                />
              </div>
              <div class="form-group">
                <label for="pass">비밀번호</label>
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  v-model="loginInfo.pass"
                  required
                />
              </div>
              <button class="btn btn-success" type="submit">로그인</button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="loginModal.hide()"
              >
                닫기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    //로그인 모달 객체 생성
    // this.loginModal = new this.$bootstrap.Modal("#loginModal");
  },
  data() {
    return {
      loginInfo: {},
      loginModal: null, //로그인 모달 객체
    }
  },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('userStore/login', this.loginInfo)
        this.loginModal.hide() //로그인 모달창 숨기기
        alert('로그인 성공')
      } catch (error) {
        alert('로그인 실패')
      }
    },
    async logout() {
      await this.$store.dispatch('userStore/logout')
      alert('로그아웃 성공')
      this.$router.push('/').catch(() => {}) //홈 화면 이동
    },
  },
}
</script>
<style scoped>
#navV {
  background-color: #fff;
  color: #ffb91a;
}
.aaa {
  margin-bottom: 50px;
}
a {
  text-decoration: none;
  color: black;
  border-radius: 50px;
}
a:hover {
  background-color: #ffb91a;
  border-radius: 50px;
  text-decoration: none;
  color: black;
}
#aa {
  width: 20px;
}
/* .nav-link {
  padding: ;
} */
</style>
