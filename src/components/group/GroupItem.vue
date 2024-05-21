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
      <v-col class="group-name" cols="12" md="3">
        <strong>{{ group.group_name }}</strong>
      </v-col>
      <v-col cols="1" class="divider-col">
        <div class="divider"></div>
      </v-col>
      <v-col class="group-info" cols="12" md="8">
        <div class="group-details">
          <span class="user-id">{{ group.user_id }}</span> |
          <span class="category">{{ group.category }}</span>
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
}

.group-info {
  padding-left: 16px;
}

.group-details {
  font-size: 0.9rem;
  color: #14b5e6;
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
