<template>
  <v-main
      class="main-container"
  >
    <v-container>
      <div
          class="pages-wrapper"
          :style="{
            computedWrapperStyle,
            transform: `scale(${scale})`,
            height: wrapperHeight,
            width: wrapperWidth
          }"
      >
          <v-img
              v-for="(file, i) in scanedFiles"
              @click="handleSelectPage(i+1)"
              :ref="el => imageRefs[i+1] = el"
              :key="file.number"
              class="main-img"
              :src="file.content"
              :style="{
                transform: `rotate(${rotationMap[i+1] || 0}deg)`,
                width: imgWidth,
                height: imgHeight,
            }"
          ></v-img>

      </div>
    </v-container>
  </v-main>

</template>

<script setup>
  import {inject, ref, watch} from "vue";
  const {imgWidth, imgHeight, wrapperWidth, wrapperHeight, scale} = inject('imgSizeState');
  const {isSidebarOpen} = inject('sidebarState');
  const { handleSelectPage, imageRefs } = inject('selectPageState');
  const {rotationMap} = inject('rotateState');

  const scanedFiles = inject('scanedFiles');

  // :src="data:image/jpeg;base64,${file.content}"

  const wrapperStyle = {
    fullSize: {
      padding: '0 0 0 8%',
      // marginTop: '64px',
    },
    origSize: {
      margin: '0 auto',
      padding: '0 0 0 0',
      // marginTop: '64px'
    }
  };

  let computedWrapperStyle = ref(wrapperStyle.fullSize);

  watch(isSidebarOpen, (newVal) => {
    computedWrapperStyle.value =  newVal ?  wrapperStyle.fullSize :   wrapperStyle.origSize;
  });

  // data:image/jpeg;base64,${file.content}
</script>

<style scoped>
  .main-img {
    cursor: pointer;
    margin: 10px;
    overflow-x: auto;
  }

  .main-container{
    background-color: #5B595C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
</style>