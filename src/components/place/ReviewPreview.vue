<template>
  <v-container class="review-preview" fluid>
    <v-row align="center" style="margin-left: 20px">
      <v-col cols="auto">
        <span class="review-total">리뷰 {{ totalReviews }}건</span>
      </v-col>
      <v-col cols="auto">
        <v-btn :color="buttonColor" class="ml-2" @click="goToReviewWrite" style="color: aliceblue;">리뷰 작성</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-slide-group show-arrows>
          <template v-if="totalReviews > 0">
            <v-slide-item v-for="(review, index) in reviews" :key="index">
              <v-card class="review-card" height="200px">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-img :src="review.imageUrl" class="review-image"></v-img>
                  </v-col>
                  <v-col cols="8" class="review-text">
                    <v-card-title class="review-title">{{ review.title }}</v-card-title>
                    <v-card-subtitle class="review-id">{{ review.writer }}</v-card-subtitle>
                    <v-card-subtitle class="review-content">{{
                      truncatedContent(review.content)
                    }}</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-item>
            <v-slide-item>
              <v-btn :color="buttonColor" class="more-reviews" @click="goToAllReviews"
              style="color: aliceblue;"
                >리뷰 더 보기</v-btn
              >
            </v-slide-item>
          </template>
          <template v-else>
            <v-slide-item>
              <v-card class="review-card no-review-card" height="200px">
                <v-row no-gutters align="center" justify="center" class="text-center">
                  <v-col>
                    <v-card-title>방문 후 리뷰를 작성해주세요!!</v-card-title>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-item>
          </template>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ReviewPreview",
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    totalReviews: {
      type: Number,
      required: true,
    },
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      buttonColor: "#58d8ff",
    };
  },
  methods: {
    goToAllReviews() {
      this.$router.push({
        name: "ReviewList",
        params: {
          placeId: this.place.placeId,
          placeName: this.place.placeName,
        },
      });
    },
    goToReviewWrite() {
      this.$router.push({ name: "ReviewWrite", params: { placeId: this.place.placeId } });
    },
    truncatedContent(content) {
      return content.length > 100 ? content.substring(0, 100) + "..." : content;
    },
  },
};
</script>

<style scoped>
.review-preview {
  padding: 16px;
  width: 100%;
  height: auto;
  margin-top: 20px;
}
.review-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.review-total {
  margin-left: 50px;
  font-size: 1.2rem;
}
.review-card {
  background-color: #f3f5f6;
  display: flex;
  align-items: center;
  width: 400px;
  height: 200px;
  margin: 30px;
  text-align: left;
  border-radius: 10px;
  overflow: hidden;
}
.no-review-card {
  background-color: #f3f5f6;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #9e9e9e;
}
.review-title {
  font-size: 1rem;
  margin: 8px 16px 0 16px;
}
.review-id {
  font-size: 0.875rem;
  color: #14b5e6;
  margin: 0 16px 16px 16px;
}
.review-content {
  font-size: 0.875rem;
  margin: 0 16px 16px 16px;
}
.more-reviews {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 200px;
  text-align: center;
  background-color: #128fb5;
  color: white;
  border-radius: 10px;
}
.more-reviews:hover {
  background-color: #128fb5;
}
</style>
