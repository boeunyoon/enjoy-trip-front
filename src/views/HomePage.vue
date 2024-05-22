<script setup>
import { getHotPost } from '@/api/board';
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router';
// import { useMemberStore } from '@/stores/member';
// import { storeToRefs } from 'pinia';
// import { onMounted } from 'vue';
// const memberStore = useMemberStore();
const router = useRouter();
const extractTextThumbnail = (content) => {
  // DOMParser를 사용하여 HTML 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textContent = doc.body.textContent || "";
  // 첫 100자 추출
  return textContent.length > 30 ? textContent.substring(0, 100) + '...' : textContent;
};
const hotPosts = ref([]);
const fetchHotList = () => {
  getHotPost(
    ({data}) => {
      console.log(data)
      hotPosts.value = data.map(hotpost => {
        return{
          ...hotpost,
          thumbnail: extractTextThumbnail(hotpost.content)
        }
      })
    },
    (error) => {
      console.log(error);
    }
  )
}
const goHotDetail = (id) => {
  router.push(`/board/${id}`)
}
const gochat = () => {
  router.push(`/chat`)
}
onMounted(() => {
  fetchHotList();
})
</script>

<template>
  <div class="content">
    <v-carousel :show-arrows="false">
      <v-carousel-item src="/public/Group 25.png" cover></v-carousel-item>
      <v-carousel-item src="/public/Group 24.png" cover></v-carousel-item>
      <v-carousel-item src="/public/Group 26.png" cover></v-carousel-item>
    </v-carousel>
    <!-- 추가 콘텐츠 -->
    <div class="additional-content">
      <h2 ><v-icon size="x-large" color="red">mdi-fire</v-icon><span style="color: red;">HOT</span> 게시글</h2>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="item in hotPosts" :key="item.id">
            <v-card
              class="mx-auto text-white d-flex flex-column post-card"
              color="light-blue-lighten-2"
              max-width="400"
              min-height="280px"
              prepend-icon="mdi-fire"
              :title=item.title
              @click="goHotDetail(item.id)"
              style="border-radius: 5px;"
            >
              <template v-slot:prepend>
                <v-icon size="x-large" color="red"></v-icon>
              </template>
            
              <v-card-text class="text-h5 py-2">
                {{ item.thumbnail }}
              </v-card-text>

              <v-spacer></v-spacer>
            
              <v-card-actions>
                <v-list-item class="w-100">
                  <template v-slot:prepend>
                    <v-avatar
                      color="grey-darken-3"
                      image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-avatar>
                  </template>
                
                  <v-list-item-title>{{ item.writer }}</v-list-item-title>
                
                
                  <template v-slot:append>
                    <div class="justify-self-end">
                      <v-icon class="me-1" icon="mdi-heart"></v-icon>
                      <span class="subheading me-2">{{ item.commentCount }}</span>
                      <span class="me-1"></span>
                      <v-icon class="me-1" icon="mdi-comment"></v-icon>
                      <span class="subheading">{{ item.commentCount }}</span>
                      <span class="me-1"></span>
                      <v-icon class="me-1" icon="mdi-eye"></v-icon>
                      <span class="subheading">{{ item.readCount }}</span>
                    </div>
                  </template>
                </v-list-item>
              </v-card-actions>
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
      <v-btn @click="gochat">GO CHAT</v-btn>
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
.post-card {
    /* padding: 16px;
    margin-bottom: 16px; */
  }
  .post-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* hover 시 그림자 효과 */
  transform: translateY(-3px); /* hover 시 살짝 위로 이동 */
  cursor: pointer; /* hover 시 커서 변경 */
  }
</style>
