<template>
  <div>
    <h1>유저 수정</h1>
    <table>
      <thead>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </thead>
      <tbody>
        <td>
          <input
            type="text"
            id="userName"
            name="userName"
            v-model="user.userName"
          />
        </td>
        <td>
          <input
            type="text"
            id="userId"
            name="userId"
            v-model="user.userId"
            readonly
          />
        </td>
        <td>
          <input
            type="text"
            id="emailId"
            name="emailId"
            v-model="user.emailId"
          />
        </td>
        <td>
          <input
            type="text"
            id="emailDomain"
            name="emailDomain"
            v-model="user.emailDomain"
          />
        </td>
        <td>
          <input
            type="text"
            id="joinDate"
            name="joinDate"
            v-model="user.joinDate"
            readonly
          />
        </td>
      </tbody>
    </table>
    <button class="btn btn-warning" @click="modifyUser">수정</button>
    <button class="btn btn-primary" @click="goList">목록</button>
  </div>
</template>

<script>
import http from '@/util/http'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      userId: '',
      userName: '',
      emailId: '',
      emailDomain: '',
      fields: ['이름', '아이디', '이메일아이디', '이메일도메인'],
    }
  },
  async created() {
    //수정할 기존 정보 띄워주기
    const id = this.$route.params.id
    this.userId = id
    this.setUser(id)
    // console.log(id)
  },
  computed: {
    ...mapState('userStore', ['user']),
  },
  methods: {
    goList() {
      this.$router.push({ name: 'userList' })
    },
    async modifyUser() {
      // let tmp = [
      //   (this.userId = this.user.userId),
      //   (this.userName = this.user.userName),
      //   (this.emailId = this.user.emailId),
      //   (this.emailDomain = this.user.emailDomain),
      // ]

      //수정버튼 클릭시 수정 요청 보내기
      try {
        await http.put(`/users/${this.userId}`, this.user)
        alert('수정 성공')
        this.$router.push({ name: 'userDetail', userId: this.userId })
      } catch (error) {
        alert('수정 실패')
      }
    },
    ...mapActions('userStore', ['setUser']),
    //목록페이지 이동
    moveList() {
      this.$router.push(`/users`)
    },
  },
}
</script>

<style></style>
