<template>
  <v-container>
    <v-form>
      <v-select v-model="category" :items="categories" label="Category" required></v-select>
      <v-text-field v-model="title" label="Title" required></v-text-field>
      <v-textarea v-model="content" label="Content" required></v-textarea>
      <v-btn @click="createGroup">그룹 생성</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category: "",
      title: "",
      content: "",
      categories: ["스터디", "운동", "맛집"],
    };
  },
  methods: {
    createGroup() {
      console.log("Group created with:", this.category, this.title, this.content);
    },
  },
};
</script>

<style scoped>
/* Add any styles here */
</style>
