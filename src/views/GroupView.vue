<template>
  <v-container>
    <h1>Group View</h1>
    <p>Welcome to the Group View page.</p>
    <v-btn @click="goCreateGroup" color="primary">그룹 만들기</v-btn>
    <v-row>
      <v-col v-for="group in groups" :key="group.id" cols="12">
        <GroupItem :group="group" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import GroupItem from "@/components/group/GroupItem.vue";

const router = useRouter();
const groups = ref([]);

const fetchGroups = async () => {
  try {
    const response = await axios.get("/api/groups");
    groups.value = response.data;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
  }
};

onMounted(() => {
  fetchGroups();
});

const goCreateGroup = () => {
  router.push({ name: "CreateGroup" });
};
</script>

<style scoped>
/* Add any styles here */
</style>
