<template>
  <div>
    <div id="bg">
      <div id="main">
        <div id="main2">
          <div id="left">
            <h1>비밀번호 찾기 🔑</h1>
            <br />
            <br />
            <div>
              <input
                type="text"
                id="userid"
                name="userId"
                placeholder="ID"
                v-model="userId"
              />
              <br />
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
            </div>
            <br />
            <br />
            <button @click="findPwd">Find Password</button>
            <br />
            <div class="createDiv">
              임시 비밀번호 전송을 위한
              <br />
              아이디와 메일을 입력해주세요.
            </div>
          </div>
          <div id="right">
            <img
              src="@/assets/pwd.jpg"
              alt="로그인 사진"
              width="100%"
              style="border-radius: 50px"
            />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import http from "@/util/http";
export default {
  data() {
    return {
      member: {},
      userName: "",
      userId: "",
      userPwd: "",
      emailId: "",
      emailDomain: "도메인 선택",
      userPwdChk: "",
    };
  },
  methods: {
    async findPwd() {
      let member = {
        userName: this.userName,
        userId: this.userId,
        userPwd: this.userPwd,
        emailId: this.emailId,
        emailDomain: this.emailDomain,
      };
      if (!this.userId) {
        alert("아이디를 입력해주세요.");
      } else if (!this.emailId) {
        alert("이메일 아이디를 입력해주세요.");
      } else if (this.emailDomain == "도메인 선택") {
        alert("이메일 도메인을 선택해주세요.");
      } else {
        try {
        await http.post(`/users/mail`, member);
        alert("임시 비밀번호 전송 성공");
      } catch (error) {
        alert("실패");
      }
      }
    },
  },
};
</script>

<style scoped>
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

.createDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#createChild {
  font-weight: 600;
  text-decoration: underline;
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
</style>
