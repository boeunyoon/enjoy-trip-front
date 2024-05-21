<template>
  <v-container class="center-content">
    <v-form class="full-screen-form" @submit.prevent="createGroup">
      <v-select v-model="category" :items="categories" label="그룹 종류" required></v-select>
      <v-text-field v-model="title" label="제목" required></v-text-field>
      <v-textarea
        v-model="content"
        label="모집하는 그룹에 대한 설명을 입력해주세요!"
        required
      ></v-textarea>
      <v-btn type="submit" class="centered-button" color="primary">그룹 생성</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const category = ref("");
const title = ref("");
const content = ref("");
const categories = ref(["스터디", "운동", "맛집", "기타"]);

const createGroup = async () => {
  try {
    const newGroup = {
      group_name: title.value,
      user_id: "currentUserId", // Replace with actual user id
      category: category.value,
    };
    await axios.post("/api/groups", newGroup);
    router.push("/groups");
  } catch (error) {
    console.error("Failed to create group:", error);
  }
};
</script>

<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.full-screen-form {
  width: 80%;
  max-width: 600px;
}

.centered-button {
  display: block;
  margin: 20px auto;
  background-color: #58d8ff;
  color: white;
}
</style>
