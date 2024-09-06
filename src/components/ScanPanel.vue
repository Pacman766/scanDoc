<template>
  <v-app class="scan-panel" >
    <NavBar />
    <Sidebar />
    <MainWindow />
  </v-app>

</template>

<script setup>
  import NavBar from '@/components/Navbar.vue'
  import Sidebar from "@/components/Sidebar.vue";
  import MainWindow from '@/components/MainWindow.vue';
  import useSidebar from "@/hooks/useSidebar.js";
  import useRotate from "@/hooks/useRotate.js";
  import useGetConfig from "@/hooks/useGetConfig.js";
  import useToggleImgSize from "@/hooks/useToggleImgSize.js";
  import useSelecetPage from "@/hooks/useSelecetPage.js";
  import {provide, onMounted, ref} from "vue";
import { files } from "@/utils/filesData.js";

const scanedFiles = ref(files);
provide('scanedFiles', scanedFiles);

  const sidebarState = useSidebar();
  const rotateState = useRotate();
  const toggleImgSize = useToggleImgSize(scanedFiles);
  const selectPageState = useSelecetPage();
  const {config, getConfig} = useGetConfig();

  provide('sidebarState', sidebarState);
  provide('rotateState', rotateState);
  provide('configState', config);
  provide('imgSizeState', toggleImgSize);
  provide('selectPageState', selectPageState);

  onMounted(() => {
    getConfig();
  });
</script>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        person: {},
      };
    },
    methods: {
      async getPerson() {
        try {
          const response = await axios.get('portal/getPerson');
          this.person = response.data.person;
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    },
    mounted() {
      this.getPerson();
    }
  };
</script>

<style scoped>
 .scan-panel{
    background-color: #5B595C;
}
</style>
