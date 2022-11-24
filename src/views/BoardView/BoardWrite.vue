<template>
  <div class="regist">
    <h1 class="">NOTICE WRITE😁</h1>
    <div class="regist_form">
      <label for="userid">작성자</label>
      <!-- <input type="text" id="userid" v-model="userid" ref="userid" /> -->
      <input type="text" id="userid" v-model="userInfo.id" readonly />
      <br />
      <label for="subject">제목</label>
      <input type="text" id="subject" v-model="subject" ref="subject" />
      <br />
      <label for="content">내용</label>
      <br />
      <textarea id="content" v-model="content" ref="content" cols="35" rows="5"></textarea>
      <br />
      <div class="btnDiv">
        <button @click="checkValue">등록</button>
        <button @click="moveList">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
import { mapState } from "vuex";

export default {
  name: "BoardWrite",
  data() {
    return {
      userid: null,
      subject: null,
      content: null,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      // !this.userid &&
      //   ((msg = '작성자 입력해주세요'),
      //   (err = false),
      //   this.$refs.userid.focus())
      err &&
        !this.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle();
    },
    registArticle() {
      // 비동기
      // TODO : 글번호에 해당하는 글정보 등록.
      // console.log('글작성 하러가자!!!!')
      let article = {
        userid: this.userInfo.id,
        subject: this.subject,
        content: this.content,
      };
      http.post("/board", article).then(({ data }) => {
        console.log(data);
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data === "success") msg = "글등록이 완료되었습니다.";
        alert(msg);
        this.moveList();
      });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style scoped>
.regist_form {
  padding: 0 700px;
}
#idDiv,
#subjectDiv,
#contentDiv {
  justify-content: space-between;
}
#userid,
#subject,
#content {
  width: 100%;
}
.btnDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 5px;
}
h1 {
  font-weight: 700;
}
button {
  background-color: #edab13;
  border: 1px solid #edab13;
  border-radius: 50px;
  width: 120px;
  height: 50px;
  color: black;
  text-align: center;
}
</style>
