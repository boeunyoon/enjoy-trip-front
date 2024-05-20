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
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
  </v-list>
  </div>
</template>

<style scoped>
.side-bar {
  background-color: #f5f5f5; /* 원하는 배경색으로 변경 가능 */
}
</style>
