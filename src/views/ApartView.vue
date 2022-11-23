<template>
  <div>
    <h1>실거래가 조회</h1>
    <!-- <input type="hidden" name="action" value="getDongDode" /> -->
    <select id="sido" @change="getGugun(sido)" style="background-color: white" v-model="sido">
      <option>시</option>
    </select>
    <select id="gugun" @change="getDong(gugun)" style="background-color: white" v-model="gugun">
      <option>구/군</option>
    </select>
    <select id="dong" @change="getDongCode(dong)" style="background-color: white" v-model="dong">
      <option>동</option>
    </select>

    <!-- 지도를 표시할 div 입니다 -->
    <div id="map" class="container" style="width: 100%; height: 300px"></div>

    <table class="table">
      <thead>
        <tr>
          <th>no</th>
          <th>daelAmount</th>
          <th>dealDate</th>
          <th>area</th>
          <th>floor</th>
          <th>cancelDealType</th>
          <th>aptCode</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="dealTable"></tbody>
    </table>

    <router-view></router-view>
  </div>
</template>

<script>
import http from "@/util/http";
//오버레이를 하나만 유지하기 위한 변수
let singleOverlay = null;
export default {
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
      map: null,
      latitude: 0,
      longitude: 0,
    };
  },
  created() {
    this.getSido();
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      document.head.appendChild(script);
    }
  },
  methods: {
    async getSido() {
      let result = await http.get(`/house/sido`);
      let sidoList = result.data;
      let sido = document.querySelector("#sido");
      sido.innerHTML = "";
      sidoList.forEach((el) => {
        sido.innerHTML += `<option value=${el.dongCode}>${el.sidoName}</option>`;
      });
    },
    async getGugun(value) {
      let result = await http.get(`/house/gugun?sidoCode=` + value);
      let sidoList = result.data;
      let gugun = document.querySelector("#gugun");
      gugun.innerHTML = "";
      sidoList.forEach((el) => {
        gugun.innerHTML += `<option value=${el.dongCode}>${el.gugunName}</option>`;
      });
    },
    async getDong(value) {
      // console.log("value", value);
      let result = await http.get(`/house/dong?gugunCode=` + value);
      // console.log(result.data);
      let sidoList = result.data;
      let dong = document.querySelector("#dong");
      dong.innerHTML = "";
      sidoList.forEach((el) => {
        dong.innerHTML += `<option value=${el.dongCode}>${el.dongName}</option>`;
      });
    },
    async getTradeCode(value) {
      
      try {
      let result = await http.get(`/house/tradeCode?Code=` + value);
          let sidoList = result.data;
      let dealTable = document.querySelector("#dealTable");
      dealTable.innerHTML = "";

      console.log("sido", sidoList);

      sidoList.forEach((houseDeal) => {
        dealTable.innerHTML += `<tr style="color: white"><td>${houseDeal.no}</td>
				<td>${houseDeal.dealAmount}</td>
				<td>${houseDeal.dealYear}년${houseDeal.dealMonth}월${houseDeal.dealDay}일</td>
				<td>${houseDeal.area}</td>
				<td>${houseDeal.floor}</td>
				<td>${houseDeal.cancelDealType}</td>
				<td>${houseDeal.aptCode}</td>
				</tr>`;
      });
        } catch (error) {
          alert("정보가 없습니다.")
          let dealTable = document.querySelector("#dealTable");
          dealTable.innerHTML = "";
        }
    },
    async getDongCode(value) {
      let result = await http.get(`/house/dongCode?Code=` + value);
      console.log("이건 result입니다", result);
      let data = result.data;

      window.navigator.geolocation.getCurrentPosition((position) => {
        this.makeMarker(position, data);
      });

      this.getTradeCode(value);
    },
    //내 위치 받아오기
    makeMarker(position, data) {
      console.log("makeMarker_position : ", position);
      console.log("makeMarker_data : ", data);
      let mapContainer = document.getElementById("map"), // 지도의 중심좌표
        mapOption = {
          center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        };

      let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

      //우측 줌 컨트롤러
      var zoomControl = new kakao.maps.ZoomControl();

      //우측 내 위치 버튼
      let myLocation = document.createElement("button");
      myLocation.setAttribute("draggable", "false");
      myLocation.setAttribute("type", "button");
      myLocation.setAttribute("class", "myLocation");
      myLocation.onclick = function () {
        map.setCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
        map.setLevel(5, {
          animate: true,
        });
      };

      map.addControl(myLocation, kakao.maps.ControlPosition.RIGHT);
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //다중 마커
      let positions = [];
      let apts = data.apt;
      for (let i = 0; i < apts.length; i++) {
        positions[i] = {
          title: apts[i].apartmentName,
          latlng: new kakao.maps.LatLng(apts[i].lat, apts[i].lng),
        };
      }

      if (positions.length > 0) {
        console.log("move");
        map.setCenter(new kakao.maps.LatLng(positions[0].latlng.Ma, positions[0].latlng.La));
        map.setLevel(5, {
          animate: true,
        });
      }

      for (let i = 0; i < positions.length; i++) {
        // let d = positions[i];
        // displayMarker(d, map, data.address, data.apt[i], data.dongCode);
      }
    },
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      let map = new kakao.maps.Map(container, options);
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
    },
    // 지도에 마커를 표시하는 함수
    displayMarker(data, map, add, apt) {
      console.log(add);
      console.log(apt);
      let marker = new kakao.maps.Marker({
        map: map,
        position: data.latlng,
      });

      //마커 클릭 시 나타날 오버레이
      let overlay = new kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition(),
      });

      //마커 클릭 시 오버레이 생성
      kakao.maps.event.addListener(marker, "click", function () {
        if (singleOverlay) {
          singleOverlay.setMap(null);
        }
        overlay.setMap(map);
        singleOverlay = overlay;
      });

      let content = document.createElement("div");
      content.setAttribute("class", "wrap");

      let info = document.createElement("div");
      info.setAttribute("class", "info");

      let title = document.createElement("div");
      title.setAttribute("class", "title");

      title.innerText = data.title;

      let close = document.createElement("div");
      close.setAttribute("class", "close");

      //오버레이 닫기
      close.addEventListener("click", function () {
        overlay.setMap(null);
      });

      let body = document.createElement("div");
      body.setAttribute("class", "body");

      let desc = document.createElement("div");
      desc.setAttribute("class", "desc");

      let ellipsis = document.createElement("div");
      ellipsis.setAttribute("class", "ellipsis");
      ellipsis.innerText = add + " " + apt.roadName;

      let jibun = document.createElement("div");
      jibun.setAttribute("class", "jibun ellipsis");
      jibun.innerText = "(지번) " + apt.jibun;

      let fv = document.createElement("button");
      fv.setAttribute("draggable", "false");
      fv.setAttribute("type", "button");
      fv.setAttribute("class", "myLocation");
      fv.onclick = function () {
        console.log("click");
      };

      desc.appendChild(jibun);
      desc.appendChild(ellipsis);

      body.appendChild(desc);
      body.appendChild(fv);
      title.appendChild(close);

      info.appendChild(title);
      info.appendChild(body);

      content.appendChild(info);

      overlay.setContent(content);
    },
  },
};
</script>

<style>
table > tr {
  color: white;
}
</style>
