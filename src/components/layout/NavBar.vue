<script setup>
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import { defineEmits, onMounted, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { getUnReadMsgCount } from "@/api/socket";

const menuStore = useMenuStore();
const memberStore = useMemberStore();
const { menuList } = storeToRefs(menuStore);
const { userinfo, isLogin } = storeToRefs(memberStore);
const { changeMenuState } = menuStore;
const { userLogout } = memberStore;
const recvList = ref([]);
const unReadMsgCount = ref(0);
const unReadMsgList = ref([]);
const stompClient = ref(null);
const connected = ref(false);
const logoutFunc = () => {
  userLogout();
  changeMenuState();
  router.push("/");
};
const router = useRouter();
const emit = defineEmits(["toggle-sidebar"]);

const gobaord = () => {
  router.push({ name: "board-list" });
};

const goHome = () => {
  router.push({ name: "home" });
};

const goLogin = () => {
  router.push({ name: "login" });
};

const goProfile = () => {
  router.push({ name: "profile" });
};

const goSearchPlace = () => {
  router.push({ name: "place-search" });
};

const goGroup = () => {
  router.push({ name: "GroupView" }); // Add this function to navigate to the GroupView
};
const fetchMsgCount = () => {
  getUnReadMsgCount(
    userinfo.value.userId,
    ({data}) => {
      console.log(data)
      unReadMsgCount.value = data
    },
    (error) => {
      console.log(error);
    }
  )
}
onUpdated(() => {
  if(userinfo.value != null){
    fetchMsgCount();
  }
})
onMounted(() => {
  connect();
  if(userinfo.value != null){
    fetchMsgCount();
  }
});
const connect = () => {
  const serverURL = "http://localhost:8080/ws";
  const socket = new SockJS(serverURL);
  stompClient.value = Stomp.over(socket);
  stompClient.value.connect(
    {},
    frame => {
      connected.value = true;
      console.log('소켓 연결 성공', frame);
      stompClient.value.subscribe("/topic/notify", res => {
        console.log('Received message:', res.body);
        const data = JSON.parse(res.body)
        if(isLogin.value && data.msgInfo.receiverId === userinfo.value.userId){
          unReadMsgList.value = data.unReadMsg;
          unReadMsgCount.value = data.unReadMsgCount;
        }
      });
    },
    error => {
      connected.value = false;
      console.error('소켓 연결 실패', error);
    }
  );
}
</script>

<template>
  <v-app-bar app class="transparent-navbar" flat>
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
    <v-toolbar-title
      style="
        color: #14b5e6;
        font-weight: 1000;
        font-size: 25px;
        margin-top: 0.2%;
        margin-left: 2.3%;
      "
      class="home-title"
      @click="goHome"
      >SsafyWA</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn icon @click="goSearchPlace" v-if="menuList[3].show">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn @click="goGroup" v-if="menuList[1].show"> 그룹 </v-btn>
    <v-btn @click="gobaord" v-if="menuList[5].show"> 게시판 </v-btn>
    <v-btn @click="logoutFunc" v-if="menuList[4].show"> 로그아웃 </v-btn>
    <v-btn @click="goLogin" v-if="menuList[0].show"> 로그인 </v-btn>
    <p v-if="isLogin">{{ userinfo.nickName }}님 안녕하세요</p>
    <p v-if="isLogin">{{ unReadMsgCount }}</p>
    <v-btn icon @click="goProfile" v-if="menuList[2].show">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.transparent-navbar {
  background-color: transparent !important;
  box-shadow: none !important;
  z-index: 10; /* 다른 요소들보다 위에 위치하도록 z-index 설정 */
}
.home-title {
  cursor: pointer;
}
</style>

<style scoped>
.transparent-navbar {
  background-color: transparent !important;
  box-shadow: none !important;
  z-index: 10; /* 다른 요소들보다 위에 위치하도록 z-index 설정 */
}
.home-title {
  cursor: pointer;
}
</style>
