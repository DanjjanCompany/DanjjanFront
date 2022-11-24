<template>
  <div>
    <h1>NOTICE DETAIL😁</h1>
    <div class="regist">
      <div class="tableDiv">
        <div>
          <table>
            <thead>
              <th v-for="field in fields" :key="field">{{ field }}</th>
            </thead>
            <tbody>
              <tr>
                <td>글 번호</td>
                <td>{{ article.articleno }}</td>
              </tr>
              <tr>
                <td>글 제목</td>
                <td>{{ article.subject }}</td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>{{ article.userid }}</td>
              </tr>
              <tr>
                <td>조회수</td>
                <td>{{ article.hit }}</td>
              </tr>
              <tr>
                <td>작성 시간</td>
                <td>{{ article.regtime }}</td>
              </tr>
              <tr>
                <td>내용</td>
                <td>{{ article.content }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="regist_form">
          <button class="">
            <router-link
              :to="{
                name: 'boardmodify',
                params: { articleno: article.articleno },
              }"
              class="btn"
            >
              수정
            </router-link>
          </button>
          <button class="">
            <router-link
              :to="{
                name: 'boarddelete',
                params: { articleno: article.articleno },
              }"
              class="btn"
            >
              삭제
            </router-link>
          </button>
          <button>
            <router-link :to="{ name: 'boardlist' }" class="btn"> 목록 </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "BoardView",
  data() {
    return {
      article: Object,
      fields: ["속성", "값"],
    };
  },
  created() {
    http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
      console.log("this.article : ", this.article);
    });
  },
  computed: {
    row() {
      return this.article.length;
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
  width: 483px;
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
a {
  padding-bottom: 15px;
  line-height: 5px;
}
</style>
