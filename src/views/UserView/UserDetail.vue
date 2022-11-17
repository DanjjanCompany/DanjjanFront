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
    <!-- <button class="btn btn-primary" @click="goList">삭제</button> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      fields: ['이름', '아이디', '이메일', '가입일자'],
    }
  },
  computed: {
    ...mapState('userStore', ['user']),
  },
  created() {
    const id = this.$route.params.id
    this.setUser(id)
    console.log(id)
  },
  methods: {
    ...mapActions('userStore', ['setUser']),
    //목록페이지 이동
    moveList() {
      this.$router.push(`/users`)
    },
  },
}
</script>
