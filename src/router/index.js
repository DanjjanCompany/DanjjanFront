import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //홈 화면
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  //로그인 페이지 화면
  {
    path: "/loginPage",
    name: "loginPage",
    component: () => import("@/views/LoginView.vue"),
  },
  // 유저 화면
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
    redirect: "/user/list",
    children: [
      //유저 등록
      {
        path: "/create",
        name: "create",
        component: () => import("@/views/UserView/UserCreate.vue"),
      },
      //유저 전체조회
      {
        path: "list",
        name: "userList",
        component: () => import("@/views/UserView/UserList.vue"),
      },
      //유저 상세조회
      {
        path: "detail/:id",
        name: "userDetail",
        component: () => import("@/views/UserView/UserDetail.vue"),
      },
      //유저 수정
      {
        path: "modify/:id",
        name: "userModify",
        component: () => import("@/views/UserView/UserUpdate.vue"),
      },
    ],
  },
  // 실거래가 화면
  {
    path: "/apart",
    name: "apart",
    component: () => import("@/views/UserView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// [뷰에서의 유효성검사]
// 화면이 렌더링 되기 전(to: 이동을 하려는 next 정보, from: 현재 페이지, next: 해당 라우트로 동작, 없앨경우 동작 X)
router.beforeEach((to, from, next) => {
  // 라우팅 시 해당 라우트가 책 관련 라우트이고 유저정보를 가지고 있지 않다면
  if (to.path.includes("user") && !store.state.userStore.userInfo.id) {
    alert("로그인이 필요한 페이지입니다.");
    return false;
  }

  // 해당 라우트로 이동
  next();
});

export default router;
