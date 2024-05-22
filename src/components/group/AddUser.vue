<template>
  <v-container>
    <h2>Add Users to {{ group.groupName }}</h2>
    <v-form>
      <v-autocomplete
        v-model="selectedUser"
        :items="allUsers"
        label="멤버 검색"
        solo-filled
        :loading="loading"
        :disabled="loading"
      ></v-autocomplete>
      <v-btn @click="addUser" :disabled="loading || !selectedUser">추가</v-btn>
    </v-form>
    <v-list>
      <v-list-item v-for="(user, index) in groupMembers" :key="index">
        {{ user.userId }}
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    groupId: {
      type: [String, Number],
      required: true,
    },
    group: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        groupName: "",
        users: [],
      }),
    },
  },
  data() {
    return {
      selectedUser: "",
      allUsers: [],
      groupMembers: [],
      loading: false,
    };
  },
  created() {
    this.fetchAllUserIds();
    this.fetchGroupMembers();
  },
  methods: {
    async fetchAllUserIds() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:8080/member/all-ids`);
        console.log("Fetched user IDs:", response.data); // Debugging log
        this.allUsers = response.data;
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchGroupMembers() {
      try {
        const response = await axios.get(`http://localhost:8080/group/${this.groupId}/members`);
        console.log("Fetched group members:", response.data); // Debugging log
        this.groupMembers = response.data;
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    },
    async addUser() {
      if (this.selectedUser) {
        this.loading = true;
        try {
          console.log("Adding user:", this.selectedUser); // Debugging log
          const response = await axios.post(
            `http://localhost:8080/group/${this.groupId}/addMember`,
            { userId: this.selectedUser },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Add user response:", response); // Debugging log
          this.fetchGroupMembers(); // Fetch group members after adding a user
          this.selectedUser = "";
          this.$emit("close"); // Emit close event to notify parent component
        } catch (error) {
          console.error("Error adding user to group:", error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific styling here */
</style>
