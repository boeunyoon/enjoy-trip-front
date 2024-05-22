<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>나의 그룹</h3>
        <v-list>
          <v-list-item v-for="group in groups" :key="group.id" @click="selectGroup(group)">
            <v-list-item-content>
              <v-list-item-title>{{ group.group_name }}</v-list-item-title>
              <v-list-item-subtitle v-if="group.isOwner">(Owner)</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <MyGroupDetail
      :group="selectedGroup"
      :show="showGroupDetail"
      @update:show="updateShowGroupDetail"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import MyGroupDetail from "@/components/group/MyGroupDetail.vue"; // Adjust the path as needed

const router = useRouter();
const memberStore = useMemberStore();
const { userinfo, isLogin } = storeToRefs(memberStore);

const groups = ref([]);
const selectedGroup = ref(null);
const showGroupDetail = ref(false);

const fetchUserGroups = async () => {
  if (!isLogin.value) {
    alert("로그인 후 이용하세요");
    router.push("/login");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/group/user/${userinfo.value.userId}`);
    const userGroups = response.data;

    groups.value = userGroups.map((group) => ({
      ...group,
      isOwner: group.groupOwner === userinfo.value.userId,
    }));
  } catch (error) {
    console.error("Failed to fetch user groups:", error);
  }
};

onMounted(() => {
  if (isLogin.value) {
    fetchUserGroups();
  }
});

const selectGroup = (group) => {
  selectedGroup.value = group;
  showGroupDetail.value = true;
};

const updateShowGroupDetail = (value) => {
  showGroupDetail.value = value;
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}

.v-list-item {
  cursor: pointer;
}

.v-list-item:hover {
  background-color: #f5f5f5;
}
</style>
