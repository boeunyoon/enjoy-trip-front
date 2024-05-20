<template>
    <v-container class="profile-page">
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="8" class="text-center">
          <v-avatar size="120" class="mx-auto">
            <v-img src="/img/dog.jpg" alt="Profile Picture"></v-img>
          </v-avatar>
          <h3 class="mt-3">윤보은</h3>
          <p>ksjbd234@naver.com</p>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="10">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" v-for="item in menuItems" :key="item.text" class="d-flex justify-center">
              <v-btn class="menu-button mx-2" block>
                <v-icon class="mr-2">{{ item.icon }}</v-icon>
                {{ item.text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const menuItems = ref([
    { icon: 'mdi-heart-outline', text: '내 좋아요 게시글' },
    { icon: 'mdi-heart-outline', text: '내 좋아요 장소' },
    { icon: 'mdi-heart-outline', text: '나의 게시글' },
    { icon: 'mdi-heart-outline', text: '나의 그룹' },
    { icon: 'mdi-heart-outline', text: '내 정보' },
    { icon: 'mdi-heart-outline', text: '새로운 버튼' },  // Added another button
  ]);
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
    height: 100px;  /* Increased height for longer buttons */
    font-size: 16px;
    font-weight: 500;
    font-family: Inter-Bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100%;  /* Ensure buttons take full width of the column */
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
  