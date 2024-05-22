<template>
  <v-container class="d-flex justify-center align-center vcon" v-if="group">
    <v-card
      class="group-module"
      outlined
      rounded="lg"
      :style="{ borderColor: '#58d8ff', borderWidth: '2px' }"
    >
      <v-card-title>{{ group.groupName }}</v-card-title>
      <v-card-text>
        <div class="group-info">
          <p><strong>종류: </strong> {{ group.type }}</p>
          <p><strong>관리자: </strong> {{ group.groupOwner }}</p>
          <p><strong>지역: </strong> {{ group.region }}</p>
          <p><strong>모임 방식: </strong> {{ group.isOnline ? "온라인" : "오프라인" }}</p>
          <br />
        </div>
        <div class="users-list">
          <h3>그룹 멤버</h3>
          <v-list>
            <v-list-item v-for="(user, index) in groupMembers" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ user.userId }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container v-else class="loading-container">
    <p>Loading...</p>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "MyGroupDetail",
  props: {
    groupId: {
      type: [String, Number],
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      groupMembers: [],
      loading: false,
    };
  },
  created() {
    console.log("Group data in MyGroupDetail:", this.group); // Debugging log
    if (this.groupId) {
      this.fetchGroupMembers();
    } else {
      console.error("groupId is not defined");
    }
  },
  methods: {
    async fetchGroupMembers() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:8080/group/${this.groupId}/members`);
        console.log("Fetched group members:", response.data); // Debugging log
        this.groupMembers = response.data;
      } catch (error) {
        console.error("Error fetching group members:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.group-module {
  transition: transform 0.3s ease;
  width: 500px;
  height: 500px;
}
.group-module:hover {
  transform: scale(1.05);
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
