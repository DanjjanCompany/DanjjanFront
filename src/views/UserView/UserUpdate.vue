<template>
  <div class="regist">
    <h1>USER MODIFY😁</h1>
    <div class="regist_form">
      <div id="idDiv">
        <label for="userName">작성자</label>
        <br />
        <input type="text" id="userName" v-model="user.userName" ref="userName" />
        <br />
      </div>
      <div id="useridDiv">
        <label for="userId">아이디</label>
        <br />
        <input type="text" id="userId" name="userId" v-model="user.userId" readonly />
        <br />
      </div>
      <div id="emailIdDiv">
        <label for="emailId">이메일 아이디</label>
        <br />
        <input type="text" id="emailId" name="emailId" v-model="user.emailId" />
        <br />
      </div>
      <div id="emailDomainDiv">
        <label for="emailDomain">이메일 도메인</label>
        <br />
        <input type="text" id="emailDomain" name="emailDomain" v-model="user.emailDomain" />
        <br />
      </div>
      <div id="joinDateDiv">
        <label for="joinDate">가입 일자</label>
        <br />
        <input type="text" id="joinDate" v-model="user.joinDate" readonly />
        <br />
      </div>
      <!-- <thead>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </thead> -->
      <!-- <tbody> -->
      <!-- <td>
          <input type="text" id="userName" name="userName" v-model="user.userName" />
        </td> -->
      <!-- <td>
          <input type="text" id="userId" name="userId" v-model="user.userId" readonly />
        </td> -->
      <!-- <td>
          <input type="text" id="emailId" name="emailId" v-model="user.emailId" />
        </td> -->
      <!-- <td>
          <input type="text" id="emailDomain" name="emailDomain" v-model="user.emailDomain" />
        </td> -->
      <!-- <td>
          <input type="text" id="joinDate" name="joinDate" v-model="user.joinDate" readonly />
        </td> -->
      <!-- </tbody> -->
      <div class="btnDiv">
        <button @click="modifyUser">수정</button>
        <button @click="goList">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      fields: ["이름", "아이디", "이메일아이디", "이메일도메인"],
    };
  },
  async created() {
    //수정할 기존 정보 띄워주기
    const id = this.$route.params.id;
    this.userId = id;
    this.setUser(id);
    // console.log(id)
  },
  computed: {
    ...mapState("userStore", ["user"]),
  },
  methods: {
    goList() {
      this.$router.push({ name: "userList" });
    },
    async modifyUser() {
      //수정버튼 클릭시 수정 요청 보내기
      try {
        await http.put(`/users/${this.userId}`, this.user);
        alert("수정 성공");
        this.$router.push({ name: "userDetail", userId: this.userId });
      } catch (error) {
        alert("수정 실패");
      }
    },
    ...mapActions("userStore", ["setUser"]),
    //목록페이지 이동
    moveList() {
      this.$router.push(`/users`);
    },
  },
};
</script>

<style scoped>
.regist_form {
  padding: 0 700px;
}
#userName,
#userId,
#emailId,
#emailDomain,
#joinDate {
  width: 100%;
  justify-content: space-between;
}
#userId,
#joinDate {
  background-color: rgba(197, 188, 188, 0.819);
  border: 1px solid rgb(136, 132, 132);
}
h1 {
  font-weight: 700;
}
button {
  background-color: #edab13;
  border: 1px solid #edab13;
  border-radius: 50px;
  width: 120px;
  height: 50px;
  color: black;
  text-align: center;
}
a {
  text-decoration: none;
  color: black;
  padding-bottom: 15px;
  line-height: 0px;
}
.btnDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 5px;
}
</style>
