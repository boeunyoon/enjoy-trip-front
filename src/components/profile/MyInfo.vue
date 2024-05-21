<template>
  <v-container class="profile-page">
    <v-row justify="center" class="mt-5">
      <v-col cols="12" md="8" class="text-center">
        <v-avatar size="120" class="mx-auto">
          <v-img :src="userinfo?.userImage || '/img/dog.jpg'" alt="Profile Picture"></v-img>
        </v-avatar>
        <h3 class="mt-3">{{ userinfo?.userNickname || "Guest" }}</h3>
        <p>{{ userinfo?.userEmail || "Guest" }}</p>
      </v-col>
    </v-row>
    <!-- Rest of your template -->
  </v-container>
</template>

<script setup>
import MyLikedPlaces from "@/components/profile/MyLikedPlaces.vue";
import MyLikedPosts from "@/components/profile/MyLikedPosts.vue";
import MyPosts from "@/components/profile/MyPosts.vue";
import MyGroups from "@/components/profile/MyGroups.vue";
import MyInfo from "@/components/profile/MyInfo.vue";
import NewButtonComponent from "@/components/profile/NewButtonComponent.vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const memberStore = useMemberStore();
const { userinfo, isLogin } = storeToRefs(memberStore);
const router = useRouter();
const menuItems = ref([
  {
    icon: "mdi-heart-outline",
    activeIcon: "mdi-heart",
    text: "내 좋아요 게시글",
    component: MyLikedPosts,
  },
  {
    icon: "mdi-heart-outline",
    activeIcon: "mdi-heart",
    text: "내 좋아요 장소",
    component: MyLikedPlaces,
  },
  { icon: "mdi-heart-outline", activeIcon: "mdi-heart", text: "나의 게시글", component: MyPosts },
  { icon: "mdi-heart-outline", activeIcon: "mdi-heart", text: "나의 그룹", component: MyGroups },
  { icon: "mdi-heart-outline", activeIcon: "mdi-heart", text: "내 정보", component: MyInfo },
  {
    icon: "mdi-heart-outline",
    activeIcon: "mdi-heart",
    text: "새로운 버튼",
    component: NewButtonComponent,
  },
]);

onBeforeMount(() => {
  if (!isLogin.value) {
    alert("로그인이 필요합니다");
    router.push({
      path: "/member/login",
      query: { redirect: router.currentRoute.value.fullPath },
    });
  }
});

const selectedMenu = ref(null);
const toggleMenu = (menuItem) => {
  if (selectedMenu.value === menuItem) {
    selectedMenu.value = null; // 이미 선택된 메뉴를 다시 클릭하면 선택 해제
  } else {
    selectedMenu.value = menuItem; // 다른 메뉴를 클릭하면 해당 메뉴를 선택
  }
};
</script>

<style scoped>
.profile-page {
  padding-top: 50px;
  text-align: center;
  font-family: Inter-Regular;
}

.profile-pic {
  border-radius: 50%;
}

.menu-button {
  background-color: #f8f9fa;
  color: #495057;
  height: 100px; /* Increased height for longer buttons */
  font-size: 16px;
  font-weight: 500;
  font-family: Inter-Bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%; /* Ensure buttons take full width of the column */
}

.menu-button .v-icon {
  font-size: 24px;
}

.menu-button:hover {
  background-color: #e9ecef;
}

.mt-4 {
  margin-top: 40px !important;
}

.v-col {
  padding: 0 8px; /* Add space between the buttons */
}
</style>
