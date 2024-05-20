<script setup>
import { useMemberStore } from '@/stores/member';
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';
import { defineEmits, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const memberStore = useMemberStore();
const {menuList} = storeToRefs(menuStore);
const {userinfo, isLogin} = storeToRefs(memberStore);
const { changeMenuState } = menuStore;
const { userLogout } = memberStore;
const logoutFunc = () => {
  userLogout()
  changeMenuState();
}
const router = useRouter();
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['toggle-sidebar']);
const gobaord = () => {
  router.push({name:'board-list'})
}
const goHome = () => {
  router.push({name:'home'})
}
const goLogin = () => {
  router.push({name : 'login'})
}
const goProfile = () => {
  router.push({name : 'profile'})
}
const goSearchPlace = () => {
  router.push({name : 'place-search'})
}
onMounted(() => {
  console.log(userinfo.value)
})
</script>

<template>
  <v-app-bar app class="transparent-navbar" flat>
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
    <v-toolbar-title style="color: #14B5E6; font-weight: 1000;" class="home-title" @click ="goHome">SsafyWA</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="goSearchPlace" v-if="menuList[3].show">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn v-if="menuList[1].show">
      공고
    </v-btn>
    <v-btn @click="gobaord" v-if="menuList[5].show">
      게시판 가기
    </v-btn>
    <v-btn @click="logoutFunc" v-if="menuList[4].show">
      로그아웃
    </v-btn>
    <v-btn @click="goLogin" v-if="menuList[0].show">
      로그인
    </v-btn>
    <p v-if="isLogin">{{ userinfo.nickName }}님 안녕하세요</p>
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
.home-title{
  cursor: pointer;
}
</style>
