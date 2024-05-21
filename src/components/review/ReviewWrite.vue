<template>
  <v-container class="main-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  label="리뷰 제목 입력해주세요!"
                  v-model="title"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  label="리뷰를 작성해주세요!"
                  v-model="content"
                  outlined
                  rows="10"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  label="파일 업로드"
                  v-model="file"
                  outlined
                  prepend-icon="mdi-paperclip"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn class="write" @click="handleSubmit">작성</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn class="cancel" @click="handleCancel">취소</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { uploadFile } from '@/aws-s3';

export default {
  data() {
    return {
      title: "",
      content: "",
      file: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const fileUrl = await uploadFile(this.file);
        console.log("File uploaded to:", fileUrl);
        // Proceed with form submission, including fileUrl
      } catch (error) {
        console.error("Error:", error);
      }
    },
    handleCancel() {
      // Reset the form
      this.title = "";
      this.content = "";
      this.file = null;
    },
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-card {
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}
.v-btn.write {
  background-color: #58d8ff;
  color: white;
}
.v-btn.cancel {
  background-color: #f3f5f6;
  color: black;
}
</style>
