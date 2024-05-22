<template>
  <v-container v-if="group" class="group-container">
    <h1>{{ group.groupName }}</h1>
    <br />
    <p>{{ group.region }}</p>
    <p>{{ group.type }}</p>
    <p>{{ group.isOnline }}</p>
    <p>{{ group.recruitMaxNumber }}</p>
    <br />
    <p>{{ group.content }}</p>
    <v-list>
      <v-list-item v-for="(user, index) in group.users" :key="index">
        {{ user }}
      </v-list-item>
    </v-list>
    <v-btn @click="applyForGroup" color="primary">신청</v-btn>
  </v-container>
  <v-container v-else class="loading-container">
    <p>Loading...</p>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const group = ref(null); // Change default to null to handle loading state
    const route = useRoute();
    const groupId = route.params.groupId;

    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/group/${groupId}`);
        group.value = response.data;
        console.log("Fetched group data:", response.data); // Debug log
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    onMounted(() => {
      fetchGroupData();
    });

    return {
      group,
    };
  },
};
</script>

<style scoped>
.group-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  margin-top: 6%;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
