<template>
  <div id="app" style="margin-top: 10%;">
    보내는 사람 아이디: 
    <input v-model="senderId" type="text">
    받는 사람 아이디: 
    <input v-model="reciverId" type="text">
    내용: 
    <input v-model="message" type="text" @keyup.enter="sendMessage">
    <div v-for="(item, idx) in recvList" :key="idx">
      <h3>보낸사람: {{ item.senderId }}</h3>
      <h3>받은사람: {{ item.reciverId }}</h3>
      <h3>내용: {{ item.content }}</h3>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  name: 'App',
  data() {
    return {
      senderId: "",
      reciverId : "",
      message: "",
      recvList: [],
      stompClient: null,
      connected: false
    }
  },
  created() {
    this.connect();
  },
  methods: {
    sendMessage() {
      if (this.senderId !== '' && this.message !== '' && this.reciverId !== '') {
        this.send();
        this.message = '';
        this.reciverId = '';
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          senderId: this.senderId,
          receiverId: this.reciverId,
          content: this.message 
        };
        this.stompClient.send("/app/notify", JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:8080/ws";
      const socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log('소켓 연결 성공', frame);
          this.stompClient.subscribe("/topic/notify", res => {
            console.log('Received message:', res.body);
            this.recvList.push(JSON.parse(res.body));
          });
        },
        error => {
          this.connected = false;
          console.error('소켓 연결 실패', error);
        }
      );
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
