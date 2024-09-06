import {ref, watch, onMounted} from 'vue';

export default function useToggleImgSize(){
    const originalSize = { width: '80%', height: '100%' };
    const wrapperWidth = '100%'; // Задайте ширину контейнера
    const wrapperHeight = '100vh'; // Задайте высоту контейнера
    const scaleValues = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];

    let imgWidth = ref(originalSize.width);
    let imgHeight = ref(originalSize.height);
    let scale = ref(convertToInt(originalSize.width)/100);
    const isFullSize = ref(false);
    let scaleVal = ref(originalSize.width);

    watch(imgWidth, (newVal) => {
        scale.value = parseInt(newVal.replace('%', ''))/100;
    });

    function convertToInt(str){
        return parseInt(str.replace('%', ''));
    }

   function toggleImgSize(){
        if (isFullSize.value && imgWidth.value !== originalSize.width){
            imgWidth.value = originalSize.width;
            imgHeight.value = originalSize.height;
            scaleVal.value = originalSize.width;
        } else {
            imgWidth.value = wrapperWidth;
            imgHeight.value = wrapperHeight;
            scaleVal.value = wrapperWidth;
        }
        isFullSize.value = !isFullSize.value;
    }

    function findClosestBoundary(value, flag) {
        let lowerBound = scaleValues[0];
        let upperBound = scaleValues[scaleValues.length - 1];
        let res = '';
        for (let i = 0; i < scaleValues.length - 1; i++) {
            const current = scaleValues[i];
            const next = scaleValues[i + 1];

            if (value >= current && value <= next || (value < lowerBound)) {
                if ( flag === 'inc') {
                    res = next;
                    break;
                } else if (flag === 'dec'){
                    res = current;
                    break;
                } else if (flag === 'change'){
                    res = (value - current) <= (next - value) ? current : next;
                    break;
                }
                break;
            } else if (value < lowerBound || value > upperBound) {
                res = (value > upperBound) ? upperBound : lowerBound;
                break;
            }
        }
        imgWidth.value = res + '%';
        imgHeight.value = res + '%';
        return res + '%';
    }

    function incScale(){
        scaleVal.value = parseInt(scaleVal.value.replace('%', '')) + 1;
        scaleVal.value =  findClosestBoundary(scaleVal.value, 'inc');
    }

    function decScale(){
        scaleVal.value = parseInt(scaleVal.value.replace('%', '')) - 1;
        scaleVal.value = findClosestBoundary(scaleVal.value, 'dec');
    }

    function changeScale(e){
        let curVal = Number(e.target.value.replace('%', ''));
        scaleVal.value =  findClosestBoundary(curVal, 'change');
        console.log(scaleVal.value)
    }

    // Метод для получения размеров изображения
    function loadImageSize(imageSrc) {
        const img = new Image();
        img.onload = () => {
            originalSize.value.width = img.width;
            originalSize.value.height = img.height;
            imgWidth.value = `${img.width}px`;
            imgHeight.value = `${img.height}px`;
        };
        img.src = imageSrc;
    }

    // Пример использования в компоненте: на этапе монтирования
    onMounted(() => {
        const exampleImageSrc = 'example.jpg'; // Здесь укажите ваш путь к изображению
        loadImageSize(exampleImageSrc);
    })

    return {
        toggleImgSize,
        imgWidth,
        imgHeight,
        wrapperWidth,
        wrapperHeight,
        scaleVal,
        incScale,
        decScale,
        changeScale,
        originalSize,
        scale,
        isFullSize
    }
}