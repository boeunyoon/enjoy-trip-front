<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ChatTest from '@/views/ChatTest.vue';

const sidebarOpen = ref(false);
const dialog = ref(false);


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
// const goWriteMessage = () => {
//   router.push("/chat")
// }
const openDialog = () => {
  dialog.value = true;
}

defineExpose({ sidebarOpen, toggleSidebar });
</script>

<template>
  <div>
    <v-list>
      <v-list-item prepend-icon="mdi-fire" title="인기 게시글" value="hot" @click="goHotList"></v-list-item>
      <v-list-item prepend-icon="mdi-trending-up" title="급상승 게시글" value="about" @click="goRecentHotList"></v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked-outline" title="쪽지쓰기" value="todolist" @click="openDialog"></v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked-outline" title="TodoList" value="todolist"></v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          쪽지 쓰기
        </v-card-title>
        <v-card-text>
          <ChatTest />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: #f5f5f5; /* 원하는 배경색으로 변경 가능 */
}
</style>
