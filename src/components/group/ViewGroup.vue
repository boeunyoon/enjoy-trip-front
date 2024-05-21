<template>
  <v-container>
    <h1>{{ group.title }}</h1>
    <p>{{ group.content }}</p>
    <v-list>
      <v-list-item v-for="(user, index) in group.users" :key="index">
        {{ user }}
      </v-list-item>
    </v-list>
    <v-btn @click="goToAddUsers">그룹원 추가</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      group: {
        title: "Example Group Title",
        content: "This is an example group content.",
        users: ["User1", "User2", "User3"],
      },
    };
  },
  methods: {
    goToAddUsers() {
      this.$router.push({ name: "AddUsers", params: { groupId: this.group.id } });
    },
  },
};
</script>
