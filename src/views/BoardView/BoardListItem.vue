<template>
  <tr>
    <td>{{ article.articleno }}</td>
    <router-link :to="`/board/view/${article.articleno}`">
      <td id="td1">
        {{ article.subject }}
      </td>
    </router-link>
    <td>{{ article.userid }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.regtime }}</td>
  </tr>
</template>

<script>
export default {
  name: 'BoardListItem',
  props: {
    article: Object,
  },
}
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
  color: #ffb91a;
}
</style>
