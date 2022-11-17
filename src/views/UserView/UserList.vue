<template>
  <div>
    <h1>유저 목록</h1>
    <table>
      <thead>
        <th v-for="field in fields" :key="field">{{ field }}</th>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.userName }}</td>
          <td>
            <router-link
              :to="{ name: 'userDetail', params: { id: user.userId } }"
            >
              {{ user.userId }}
            </router-link>
          </td>
          <td>{{ user.emailId }}@{{ user.emailDomain }}</td>
          <td>{{ user.joinDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      fields: ['번호', '이름', '아이디', '이메일', '가입일자'],
    }
  },
  computed: {
    //mapState사용
    ...mapState('userStore', ['users']),
  },
  created() {
    //mapActions 사용
    this.setUsers()
  },
  methods: {
    //store의 setBooks 메소드를 직접 호출가능하도록 등록
    ...mapActions('userStore', ['setUsers']),
  },
}
</script>
