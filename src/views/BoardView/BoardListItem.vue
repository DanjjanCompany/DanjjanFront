<template>
  <!-- <tr>
    <td>{{ article.articleno }}</td>
    <router-link :to="`/board/view/${article.articleno}`">
      <td id="td1">
        {{ article.subject }}
      </td>
    </router-link>
    <td>{{ article.userid }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.regtime }}</td>
  </tr> -->
  <div>
    <a @click="test()">123</a>
    <b-table striped hover small :items="article" :fields="fields"> </b-table>
  </div>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    article: Object,
  },
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    console.log("after props", this.$props);
  },
  methods: {
    test() {
      console.log(this.article);
    },
  },
};
</script>

<style>
td {
  color: white;
  text-align: center;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
#td1 {
  padding-top: 25px;
  color: #ffb91a;
}
</style>
