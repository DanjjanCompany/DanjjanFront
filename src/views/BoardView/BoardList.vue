<template>
  <div>
    <div class="bg">
      <h1>NOTICE 🎄</h1>
      <div>
        <button @click="moveWrite" id="writeBtn">글 작성</button>
      </div>
      <div v-if="articles.length" class="tablePadding">
        <b-table
          striped
          hover
          :items="articles"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          class="table1"
          @row-clicked="viewArticle"
          :sort-desc.sync="sortDesc"
          :sort-by.sync="sortBy"
        ></b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="row"
          :per-page="perPage"
          first-text="🌑"
          prev-text="🌜"
          next-text="🌛"
          last-text="🌕"
          align="center"
          aria-controls="my-table"
        ></b-pagination>
      </div>
      <div class="text-center" v-else>게시글이 없습니다.</div>
    </div>
  </div>
  <!-- ⏮⏪⏩⏭ -->
</template>

<script>
import http from "@/util/http";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        {
          key: "articleno",
          label: "글 번호",
          tdClass: "tdClass",
          sortable: false,
        },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      perPage: 5,
      currentPage: 1,
      sortBy: "articleno",
      sortDesc: false,
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http.get("/board").then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      console.log(article);
      this.$router.push({
        name: "boardview",
        params: {
          articleno: article.articleno,
          hit: true,
        },
      });
      // if (this.user() !== null) {
      //   if (this.user().userId === article.userId) {
      //     this.$router.push({
      //       name: "freeboardview",
      //       params: {
      //         articleNo: article.articleNo,
      //         userId: article.userId,
      //         hit: true,
      //       },
      //     });
      //   } else {
      //     this.$router.push({
      //       name: "freeboardview",
      //       params: {
      //         articleNo: article.articleNo,
      //         userId: article.userId,
      //         hit: false,
      //       },
      //     });
      //   }
      // } else {
      //   swal("잘못된 접근입니다.", "로그인을 해주세요", "error");
      // }
    },
  },
  computed: {
    row() {
      return this.articles.length;
    },
  },
};
</script>

<style scoped>
.tdClass {
  width: 50px;
}
.bg {
  padding: 0px 300px;
}
.tdSubject {
  width: 200px;
  text-align: left;
}
/* table {
  border: 1px solid #08250b;
}
 */
/* tr {
  height: 50px;
  line-height: 40px;
  color: black;
} */
#writeBtn {
  border-radius: 50px;
  width: 120px;
  height: 40px;
  line-height: 5px;
  position: fixed;
  top: 140px;
  left: 1500px;
  background-color: #edab13;
  border: 1px solid #edab13;
}
td {
  width: 200px;
  line-height: 100px;
}
th {
  background-color: black;
}
.tablePadding {
  margin-top: 50px;
}
.table1 {
  background-color: white;
  color: black;
  padding: 0 100px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #08250b;
}
tr {
  color: white;
}
h1 {
  font-weight: 700;
}
.page-link {
  background-color: black;
  color: white;
}
</style>
