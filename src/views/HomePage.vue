<script setup>
// import { useMemberStore } from '@/stores/member';
// import { storeToRefs } from 'pinia';
// import { onMounted } from 'vue';
// const memberStore = useMemberStore();
</script>

<template>
  <div class="content">
    <v-carousel :show-arrows="false">
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>
      <v-carousel-item src="../assets/testimg.png" cover></v-carousel-item>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>
    <!-- 추가 콘텐츠 -->
    <div class="additional-content">
      <h2>HOT 게시글</h2>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="item in 3" :key="item">
            <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Explore"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
          </v-col>
        </v-row>
      </v-container>
      <h2>모집 중인 그룹</h2>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="item in 3" :key="item">
            <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Explore"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 0;
  margin: 0;
  height: 100vh;
}
.additional-content {
  padding: 16px;
}
</style>
