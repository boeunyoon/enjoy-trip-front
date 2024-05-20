<script setup>
import { ref, onMounted } from "vue";
import BoardListItem from '../components/board/BoardListItem.vue'

const page = ref(1);

import { listArticle } from '@/api/board';
import { useRouter } from "vue-router";
const router = useRouter();
const articles = ref([]);
const extractTextThumbnail = (content) => {
  // DOMParser를 사용하여 HTML 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textContent = doc.body.textContent || "";
  // 첫 100자 추출
  return textContent.length > 30 ? textContent.substring(0, 100) + '...' : textContent;
};

const getArticleList = () => {
  listArticle(
    ({ data }) => {
      articles.value = data.map(article => {
        return{
          ...article,
          thumbnail: extractTextThumbnail(article.content)
        }
      })
      console.log(articles.value);
    },
    (error) => {
      console.error(error);
    }
  )
}
onMounted(() => {
  getArticleList();
});
const goWrite = () => {
  router.push('/board/write')
}
</script>

<template>
    <div style="margin-top: 7%;">
      <v-row justify="center" align="center">
        <v-col cols="3">
          <v-select
            label="카테고리"
            :items="['자유 게시판', '우리 게시판', '거래 게시판', '질문 게시판', '정보 게시판']"
            variant="underlined"
            style="margin-left: 10%;"
          ></v-select>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="1">
          <v-btn color="#87CEEB" @click="goWrite">글쓰기</v-btn>
        </v-col>
      </v-row>
        
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