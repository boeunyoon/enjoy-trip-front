<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>{{ group.name }}</v-card-title>
      <v-card-text>
        <p>{{ group.description }}</p>
      </v-card-text>
      <v-card-actions v-if="group.isOwner">
        <v-btn color="primary" @click="editGroup">Edit</v-btn>
        <v-btn color="secondary" @click="addMember">Add Member</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="error" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:show"]);
const dialog = ref(props.show);

watch(
  () => props.show,
  (newVal) => {
    dialog.value = newVal;
  }
);

const editGroup = () => {
  // Implement your edit group logic here
  alert("Edit group functionality");
};

const addMember = () => {
  // Implement your add member logic here
  alert("Add member functionality");
};

const closeDialog = () => {
  dialog.value = false;
  emit("update:show", false);
};
</script>
