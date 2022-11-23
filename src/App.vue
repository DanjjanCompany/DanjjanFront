<template>
  <div id="app">
    <NavView />
    <!-- <FooterView /> -->
    <router-view />
  </div>
</template>

<script>
import NavView from "@/components/common/NavView.vue";
// import FooterView from "@/components/common/FooterView.vue";
export default {
  components: {
    NavView,
    // FooterView,
  },
  devServer: {
    proxy: "http://localhost:9000/api",
  },
};
</script>

<style>
@import "@/assets/mvp.css";
#app {
  /* https://creativestudio.kr/3179 */
  /* font-family: 'SDSamliphopangche_Outline'; */
  font-family: "Pretendard";
  background-color: #08250b;
  color: #ffb91a;
  width: 100%;
  height: 902px;
  text-align: center;
}
::selection {
  background-color: #ffb91a;
  color: white;
}
/* @font-face {
  font-family: 'SDSamliphopangche_Outline';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
} */
@font-face {
  font-family: "Pretendard";
  font-weight: 300;
  font-style: normal;
  src: url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot");
  src: url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot?#iefix")
      format("embedded-opentype"),
    url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff2")
      format("woff2"),
    url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff") format("woff"),
    url("https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.ttf")
      format("truetype");
  font-display: swap;
}
</style>
