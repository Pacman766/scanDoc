import {ref} from 'vue';

export default function useRotate(){
    const rotation = ref(0);

    function rotateImage(){
        rotation.value += 90;
        if (rotation.value === 360){
            rotation.value = 0;
        }
    }

    return {
        rotation,
        rotateImage
    }
}