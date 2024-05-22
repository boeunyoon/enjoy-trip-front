<template>
  <v-container v-if="group" class="group-container">
    <h1>{{ group.groupName }}</h1>
    <br />
    <p>{{ group.region }}</p>
    <p>{{ group.type }}</p>
    <p>{{ group.isOnline }}</p>
    <p>{{ group.recruitMaxNumber }}</p>
    <br />
    <p>{{ group.content }}</p>
    <v-list>
      <v-list-item v-for="(user, index) in group.users" :key="index">
        {{ user }}
      </v-list-item>
    </v-list>
    <v-btn @click="applyForGroup" color="primary">신청</v-btn>
  </v-container>
  <v-container v-else class="loading-container">
    <p>Loading...</p>
  </v-container>
</template>

<script>
import { useUnReadMsgStore } from "@/stores/message";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const group = ref(null); // Change default to null to handle loading state
    const route = useRoute();
    const groupId = route.params.groupId;
    const memberStore = useMemberStore();
    const unReadMsgStore = useUnReadMsgStore();
    const { userinfo } = storeToRefs(memberStore);
    const stompClient = ref(null);
    const connected = ref(false);
    const senderId = ref("");
    const receiverId = ref("");
    const message = ref("");

    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/group/${groupId}`);
        group.value = response.data;
        console.log("Fetched group data:", response.data); // Debug log
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    const applyForGroup = () => {
      senderId.value = userinfo.value.userId;
      receiverId.value = group.value.groupOwner;
      message.value = senderId.value + "님이 " + group.value.groupName + "에 가입신청을 했습니다."
      sendMessage();
    }
    

    onMounted(() => {
      fetchGroupData();
      connect();
    });
    const sendMessage = () => {
      if (senderId.value !== '' && receiverId.value !== '') {
        send();
        message.value = '';
        receiverId.value = '';
      }
    }

    const send = () => {
      if (stompClient.value && stompClient.value.connected) {
        const msg = {
          senderId: senderId.value,
          receiverId: receiverId.value,
          content: message.value
        };
        stompClient.value.send("/app/notify", JSON.stringify(msg), {});
      }
    }
    const connect = () => {
      const serverURL = "http://localhost:8080/ws";
      const socket = new SockJS(serverURL);
      stompClient.value = Stomp.over(socket);
      stompClient.value.connect(
        {},
        frame => {
          connected.value = true;
          console.log('소켓 연결 성공', frame);
          stompClient.value.subscribe("/topic/notify", res => {
            console.log('Received message:', res.body);
            const data = JSON.parse(res.body)
            if(data.msgInfo.receiverId === userinfo.value.userId){
              unReadMsgStore.setUnReadMsgCount(data.unReadMsgCount);
            }
          });
        },
        error => {
          connected.value = false;
          console.error('소켓 연결 실패', error);
        }
    );
}

    return {
      group,
      applyForGroup
    };
  },
};
</script>

<style scoped>
.group-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  margin-top: 6%;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
