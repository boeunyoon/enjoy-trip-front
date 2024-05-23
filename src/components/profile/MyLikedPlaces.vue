<script setup>
import { getLikedPlace } from "@/api/place";
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import PlaceCard from "../place/PlaceCard.vue";
const router = useRouter();
const memberStore = useMemberStore();
const page = ref(1);
const { userinfo } = storeToRefs(memberStore);
const palces = ref(null);
const getPlace = () => {
  const userId = userinfo.value.userId;
  getLikedPlace(
    userId,
    ({ data }) => {
      console.log(data);
      palces.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
const goToPlaceDetail = (id) => {
  router.push(`/place/${id}`);
};
onMounted(() => {
  getPlace();
});
</script>

<template>
  <div>
    <div>
      <!-- <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                :length="Math.ceil(articles.length / 5)"
                class="my-4"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row> -->
    </div>
  </div>
</template>

<style scoped></style>
