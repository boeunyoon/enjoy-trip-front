<template>
  <v-container>
    <h2>Add Users to {{ group.title }}</h2>
    <v-form>
      <v-text-field v-model="newUser" label="Add User"></v-text-field>
      <v-btn @click="addUser">Add User</v-btn>
    </v-form>
    <v-list>
      <v-list-item v-for="(user, index) in group.users" :key="index">
        {{ user }}
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: ["groupId"],
  data() {
    return {
      newUser: "",
      group: null,
    };
  },
  created() {
    this.fetchGroupDetails(this.groupId);
  },
  methods: {
    fetchGroupDetails(groupId) {
      // Fetch the group details using the groupId
      // This is a placeholder, replace with actual API call
      this.group = {
        id: groupId,
        title: "Example Group Title",
        users: ["User1", "User2", "User3"],
      };
    },
    addUser() {
      if (this.newUser) {
        this.group.users.push(this.newUser);
        this.newUser = "";
      }
    },
  },
};
</script>
<style></style>
