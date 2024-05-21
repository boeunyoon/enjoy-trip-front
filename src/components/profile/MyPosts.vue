<script setup>
import {ref} from "vue";
import { getMyPost } from '@/api/profile';
import { useMemberStore } from '@/stores/member';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import BoardListItem from "../board/BoardListItem.vue";
const memberStore = useMemberStore()
const {userinfo} = storeToRefs(memberStore);
const articles = ref([]);
const page = ref(1);
const fetchArticle = () => {
    const userId = userinfo.value.userId;
    getMyPost(
        userId,
        ({data}) => {
            articles.value = data;
            console.log(data)
        },
        (error) => {
            console.log(error);
        }
    )
}
onMounted(() => {
    fetchArticle();
})
</script>

<template>
    <div>
        <v-data-iterator :items="articles" :page="page">
          <template v-slot:default="{ items }">
            <template
              v-for="(item, i) in items"
              :key="i"
            >
              <BoardListItem :article="item.raw"/>
              <br>
            </template>
          </template>
        </v-data-iterator>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                :length="Math.ceil(articles.length / 5)"
                class="my-4"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
    </div>
</template>

<style scoped>

</style>