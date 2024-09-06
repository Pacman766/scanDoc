import {ref} from 'vue';

export default function useSidebar(){
    const isSidebarOpen = ref(true);

    function toggleSidebar(){
        isSidebarOpen.value = !isSidebarOpen.value;
    }

    return {
        isSidebarOpen,
        toggleSidebar
    }
}