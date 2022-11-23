<template>
  <div>
    <h1 class="">NOTICE😀</h1>
    <div>
      <button @click="moveWrite" id="writeBtn">글 작성</button>
    </div>
    <div v-if="articles.length">
      <table>
        <colgroup>
          <col style="width: 5%;" />
          <col style="width: 65%;" />
          <col style="width: 10%;" />
          <col style="width: 5%;" />
          <col style="width: 15%;" />
        </colgroup>
        <thead style="background-color: #ffb91a;">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <board-list-item
            v-for="article in articles"
            :key="article.articleNo"
            :article="article"
          ></board-list-item>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </div>
</template>

<script>
import http from '@/util/http'
import BoardListItem from '@/views/BoardView/BoardListItem'

export default {
  name: 'BoardList',
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http.get('/board').then(({ data }) => {
      this.articles = data
    })
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: 'boardwrite' })
    },
  },
}
</script>

<style scoped>
table {
  border: 1px solid #08250b;
}
#writeBtn {
  border-radius: 50px;
  width: 120px;
  height: 40px;
  line-height: 5px;
  background-color: #edab13;
  border: 1px solid #edab13;
}
</style>
