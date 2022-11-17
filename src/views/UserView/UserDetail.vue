<template>
  <div>
    <h1>유저 상세 정보</h1>
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
    <button class="btn btn-primary">
      <router-link
        :to="{
          name: 'userList',
        }"
      >
        목록
      </router-link>
    </button>
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
    <button class="btn btn-danger" @click="deleteUser">삭제</button>
  </div>
</template>

<script>
import http from '@/util/http'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      userId: '',
      fields: ['이름', '아이디', '이메일', '가입일자'],
    }
  },
  computed: {
    ...mapState('userStore', ['user']),
  },
  created() {
    const id = this.$route.params.id
    this.userId = id
    this.setUser(id)
    console.log(id)
  },
  methods: {
    ...mapActions('userStore', ['setUser']),
    //목록페이지 이동
    async deleteUser() {
      //id 정보 가져와서 삭제요청 보내기
      try {
        await http.delete(`/users/${this.userId}`)
        alert('삭제 성공')
        this.$router.push({ name: "userList" });
      } catch (error) {
        alert('삭제 실패')
      }
    },
  },
}
</script>
