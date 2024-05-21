<template>
  <div>
    <h1>Group View</h1>
    <p>Welcome to the Group View page.</p>
    <v-btn @click="goCreateGroup">그룹 만들기</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goCreateGroup = () => {
  router.push({ name: "CreateGroup" });
};
</script>

<style scoped>
/* Add any styles here */
</style>
