<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
const router = useRouter();

// function closeSidebar() {
//   sidebarOpen.value = false;
// }
const goHotList = () => {
  router.push("/board/hot")
}
const goRecentHotList = () => {
  router.push("/board/recent/hot")
}
defineExpose({ sidebarOpen, toggleSidebar });
</script>

<template>
  <div>
    <v-list>
      <v-list-item prepend-icon="mdi-fire" title="인기 게시글" value="hot" @click="goHotList"></v-list-item>
      <v-list-item prepend-icon="mdi-trending-up" title="급상승 게시글" value="about" @click="goRecentHotList"></v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked-outline" title="TodoList" value="todolist"></v-list-item>
  </v-list>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: #f5f5f5; /* 원하는 배경색으로 변경 가능 */
}
</style>
