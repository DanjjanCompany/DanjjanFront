<template>
  <div>
    <h1>USER DETAIL😁</h1>
    <div class="regist">
      <div class="tableDiv">
        <table>
          <thead>
            <th v-for="field in fields" :key="field">{{ field }}</th>
          </thead>
          <tbody>
            <td>{{ user.userName }}</td>
            <td>{{ user.userId }}</td>
            <td>{{ user.emailId }}@{{ user.emailDomain }}</td>
            <td>{{ user.joinDate }}</td>
          </tbody>
        </table>
        <div class="regist_form">
          <button>
            <router-link
              :to="{
                name: 'userModify',
                params: { userId: user.userId },
              }"
            >
              수정
            </router-link>
          </button>
          <button class="" @click="deleteUser">삭제</button>
          <button class="">
            <router-link
              :to="{
                name: 'userList',
              }"
            >
              목록
            </router-link>
          </button>
        </div>
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
      userId: "",
      fields: ["이름", "아이디", "이메일", "가입일자"],
    };
  },
  computed: {
    ...mapState("userStore", ["user"]),
  },
  created() {
    const id = this.$route.params.id;
    this.userId = id;
    this.setUser(id);
    console.log(id);
  },
  methods: {
    ...mapActions("userStore", ["setUser"]),
    //목록페이지 이동
    async deleteUser() {
      //id 정보 가져와서 삭제요청 보내기
      try {
        await http.delete(`/users/${this.userId}`);
        alert("삭제 성공");
        this.$router.push({ name: "userList" });
      } catch (error) {
        alert("삭제 실패");
      }
    },
  },
};
</script>
<style scoped>
button {
  background-color: #edab13;
  border: 1px solid #edab13;
  border-radius: 50px;
  height: 50px;
  color: black;
  text-align: center;
}
a {
  text-decoration: none;
  color: black;
  padding-bottom: 15px;
  line-height: 10px;
}

.regist_form {
  width: 483px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;
}
.regist {
  display: flex;
  justify-content: center;
}
.tableDiv {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-direction: column;
  width: 483px;
}
h1 {
  font-weight: 700;
  margin-bottom: 50px;
}
table {
  width: 100%;
}
</style>
