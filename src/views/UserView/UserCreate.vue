<template>
  <div class="container">
    <div class="">
      <div class="">
        <!-- <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">회원가입</mark>
        </h2> -->
        <h1>유저 등록</h1>
      </div>
      <div id="formDiv">
        <form id="form-join" method="POST" action="">
          <div class="mb-3">
            <label for="username" class="form-label">이름 :</label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="userName"
              placeholder="이름"
              v-model="userName"
            />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 :</label>
            <input
              type="text"
              class="form-control"
              id="userid"
              name="userId"
              placeholder="아이디"
              v-model="userId"
            />
          </div>
          <div id="idcheck-result"></div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 :</label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userPwd"
              placeholder="비밀번호"
              v-model="userPwd"
            />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호 확인 :</label>
            <input
              type="password"
              class="form-control"
              id="pwdcheck"
              placeholder="비밀번호 확인"
            />
          </div>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일 :</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="emailid"
                name="emailId"
                placeholder="이메일 아이디"
                v-model="emailId"
              />
              <span class="input-group-text">@</span>
              <select
                class="form-select"
                id="emaildomain"
                name="emailDomain"
                aria-label="이메일 도메인 선택"
                v-model="emailDomain"
              >
                <option selected>선택하기</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="google.com">google.com</option>
                <option value="ssafy.com">ssafy.com</option>
              </select>
            </div>
          </div>
          <div class="col-auto text-center">
            <button
              type="button"
              id="btn-join"
              class="btn btn-outline-primary mb-3"
              @click="signUp"
            >
              회원가입
            </button>
            <button
              type="button"
              id="btn-clear"
              class="btn btn-outline-success mb-3"
            >
              초기화
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
export default {
  data() {
    return {
      member: {},
      userName: '',
      userId: '',
      userPwd: '',
      emailId: '',
      emailDomain: '',
    }
  },
  methods: {
    async signUp() {
      let member = {
        userName: this.userName,
        userId: this.userId,
        userPwd: this.userPwd,
        emailId: this.emailId,
        emailDomain: this.emailDomain,
      }

      try {
        console.log('member : ', member)
        await http.post(`/users/`, member)
        alert('등록 성공')
        this.$router.push({ name: 'home' })
      } catch (error) {
        alert('등록 실패')
      }
    },
  },
}
</script>

<style>
#formDiv {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
