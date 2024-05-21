<script setup>
import { ref } from 'vue';

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// function closeSidebar() {
//   sidebarOpen.value = false;
// }

defineExpose({ sidebarOpen, toggleSidebar });
</script>

<template>
  <div>
    <v-list>
      <v-list-item prepend-icon="mdi-fire" title="인기 게시글" value="hot"></v-list-item>
      <v-list-item prepend-icon="mdi-trending-up" title="급상승 게시글" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-checkbox-marked-outline" title="TodoList" value="todolist"></v-list-item>
  </v-list>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: #f5f5f5; /* 원하는 배경색으로 변경 가능 */
}
</style>
