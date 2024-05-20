<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="mx-auto custom-card" @click="goToPlaceDetail">
      <v-img :src="place.image" class="card-image" height="300px" cover></v-img>
      <v-card-title>{{ place.placeName }}</v-card-title>
      <v-card-subtitle>{{ place.roadAddressName }}</v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="toggleLike" class="heart-btn">
          <v-icon :color="isLiked ? 'blue' : 'black'">{{
            isLiked ? "mdi-heart" : "mdi-heart-outline"
          }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
    };
  },
  methods: {
    toggleLike(event) {
      this.isLiked = !this.isLiked;
      this.$emit("update-like", this.place, this.isLiked);
    },
    goToPlaceDetail() {
      this.$router.push({ name: "place-specific", params: { id: this.place.placeId } });
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
</style>
