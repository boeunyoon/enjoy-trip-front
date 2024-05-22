<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});

const goToGroup = () => {
  router.push(`/group/${props.group.id}`);
};
</script>

<template>
  <v-card
    class="group-card"
    outlined
    color="#F3F5F6"
    style="border-radius: 10px; margin: 0px 10% 0px 10%"
    @click="goToGroup"
  >
    <v-row align="center" no-gutters>
      <v-col
        class="group-name"
        cols="12"
        md="6"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center"
      >
        <strong>{{ group.groupName }}</strong>
        <div class="writer-details">
          <span class="author">{{ group.groupOwner }}</span> |
          <span class="numOfGroup">{{ group.recruitMaxNumber }}</span>
        </div>
      </v-col>
      <v-col cols="1" class="divider-col">
        <div class="divider"></div>
      </v-col>
      <v-col
        class="group-info"
        cols="12"
        md="5"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center"
      >
        <div class="post-content">
          <span class="group-type">{{ group.type }}</span> |
          <span class="region">{{ group.region }}</span> |
          <span class="isOnline">{{ group.isOnline }}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.group-card {
  padding: 16px;
  margin-bottom: 16px;
}
.group-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  cursor: pointer;
}

.group-name {
  font-size: 1.2rem;
  text-align: center;
}

.group-info {
  padding-left: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
}

.writer-details {
  font-size: 0.8rem;
}

.author {
  color: #58d8ff;
}

.divider-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.divider {
  height: 100%;
  width: 1px;
  margin: 0 16px;
  background-color: #000;
}
</style>
