<template>
    <v-navigation-drawer
        :model-value="isSidebarOpen"
        class="side-bar mt-16"
    >
      <v-divider></v-divider>
      <v-container fluid class="pb-15 d-flex-column align-center justify-center">
        <v-row
            v-for="file in files"
            class="mx-auto w-75"

        >
          <div class="w-100 mb-5">
            <v-img
                @click="handleSelectPage(file.number)"
                :key=file.number
                class="side-img"
                :src="file.content"
                :style="{
                  border: selectedPage === file.number ?  '4px solid blue' : '',
                }"

            ></v-img>
            <p style="text-align: center">{{ file.number+1 }}</p>
          </div>

        </v-row>

      </v-container>
    </v-navigation-drawer>

</template>

<script setup>
  import { inject, ref, defineProps } from "vue";
  import {files} from "@/utils/filesData.js";

  const {isSidebarOpen} = inject('sidebarState');
  const {rotation} = inject('rotateState');
  const {handleSelectPage, selectedPage, imageRefs} = inject('selectPageState');
</script>

<style scoped>
.side-bar{
  background-color: #424242;
  color: #fff;
}
.side-img {
  box-sizing: border-box;
  object-fit: contain;
  cursor: pointer;
}
</style>