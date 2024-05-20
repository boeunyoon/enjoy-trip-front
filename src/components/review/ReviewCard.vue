<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="mx-auto custom-card" @click="goToReviewDetail">
      <v-img :src="review.imageUrl" class="card-image" height="200px" cover></v-img>
      <v-card-title>{{ review.title }}</v-card-title>
      <v-card-subtitle>{{ review.writer }}</v-card-subtitle>
      <v-card-text>{{ review.content }}</v-card-text>
      <v-card-text class="review-date">{{ formattedDate }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="toggleLike" class="heart-btn">
          <v-icon :color="isLiked ? 'blue' : 'black'">{{
            isLiked ? "mdi-heart" : "mdi-heart-outline"
          }}</v-icon>
          <span>{{ review.likes }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ReviewCard",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
    };
  },
  computed: {
    formattedDate() {
      console.log("Raw dateTime:", this.review.dateTime);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(this.review.dateTime);
      console.log("Parsed date:", date);
      return date.toLocaleDateString(undefined, options);
    },
  },
  methods: {
    toggleLike(event) {
      this.isLiked = !this.isLiked;
      this.$emit("like", this.review.id);
    },
    goToReviewDetail() {
      // Implement navigation to review detail if needed
    },
  },
};
</script>

<style scoped>
.custom-card {
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
}
.card-image {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.heart-btn {
  margin-top: -10px;
}
.review-date {
  font-size: 0.75rem;
  color: grey;
  margin-top: 10px;
}
</style>
