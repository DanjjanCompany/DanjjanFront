<template>
  <div>
    <div id="bg">
      <div id="main">
        <div id="main2">
          <div id="left">
            <h1>SIGN UP🎅</h1>
            <br />
            <br />
            <div class="inputDiv">
              <input
                type="text"
                id="username"
                name="userName"
                placeholder="😊 이름을 입력해 주세요"
                v-model="userName"
              />
            </div>
            <div class="inputDiv">
              <!-- <label for="userid" class="input-label">
                ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label> -->
              <input
                type="text"
                id="userid"
                name="userId"
                placeholder="🎃 아이디를 입력해 주세요"
                v-model="userId"
              />
            </div>
            <div class="inputDiv">
              <!-- <label for="userpwd" class="input-label">
                PW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label> -->
              <input
                type="password"
                id="userpwd"
                name="userPwd"
                placeholder="🔒 비밀번호"
                v-model="userPwd"
              />
            </div>
            <div class="inputDiv">
              <!-- <label for="pwdcheck" class="input-label">PW again</label> -->
              <input
                type="password"
                id="pwdcheck"
                placeholder="🔐 비밀번호 확인"
                v-model="userPwdChk"
              />
            </div>
            <div class="inputDiv">
              <!-- <label for="emailid" class="input-label">이메일</label> -->
              <input
                type="text"
                id="emailid"
                name="emailId"
                placeholder="✉ 이메일 아이디"
                v-model="emailId"
              />
              <span class="input-label">&nbsp;@&nbsp;</span>
              <select
                id="emaildomain"
                name="emailDomain"
                aria-label="도메인 선택"
                v-model="emailDomain"
              >
                <option selected>도메인 선택</option>
                <option value="naver.com" selected>naver.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="google.com">google.com</option>
                <option value="ssafy.com">ssafy.com</option>
              </select>
            </div>
            <div class="col-auto text-center">
              <button type="button" id="btn-join" @click="signUp">
                회원가입
              </button>
              <br />
              <br />
              <button type="button" id="btn-clear" @click="inputClear">
                초기화
              </button>
            </div>
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
      emailDomain: '도메인 선택',
      userPwdChk: '',
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
    inputClear() {
      this.userName = ''
      this.userId = ''
      this.userPwd = ''
      this.emailId = ''
      this.emailDomain = '도메인 선택'
      this.userPwdChk = ''
    },
  },
}
</script>

<style>
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

.inputDiv {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-bottom: 20px;
}
#emaildomain {
  border-radius: 25px;
  border: 1px solid lightgrey;
}
.input-label {
  line-height: 45px;
}

#userid,
#username {
  width: 581.5px;
}
</style>
