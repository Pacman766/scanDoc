import {ref, watch, onMounted, onBeforeUnmount } from 'vue';

export default function useSelecetPage(){
    const selectedPage = ref(0);
    const imageRefs = ref({});
    let observer = null;

    function handleSelectPage(pageNumber){
        selectedPage.value = pageNumber;
        scrollToSelectedPage();
    }

    function scrollToSelectedPage() {
        const selectedImageProxy = imageRefs.value[selectedPage.value];
        const selectedImage = selectedImageProxy ? selectedImageProxy.$el || selectedImageProxy : null;
        if (selectedImage) {
            selectedImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = Object.values(imageRefs.value).map(page => page.$el || page);
                const pageIndex = elements.indexOf(entry.target);
                if (pageIndex !== -1) {
                    selectedPage.value = pageIndex;
                }
            }
        });
    }

    onMounted(() => {
        observer = new IntersectionObserver(onIntersection, {
            root: null, // Отслеживание внутри окна
            rootMargin: '0px',
            threshold: 0.5 // Срабатывание, когда 50% элемента видно
        });

        Object.values(imageRefs.value).forEach(img => {
            observer.observe(img.$el || img);
        });
    });

    onBeforeUnmount(() => {
        if (observer) {
            observer.disconnect();
        }
    });

    watch(selectedPage, () => {
        scrollToSelectedPage();
    });

    return {
        selectedPage,
        handleSelectPage,
        imageRefs
    }
}