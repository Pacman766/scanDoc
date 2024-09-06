import {ref} from 'vue';
import axios from "axios";

export default function useGetConfig(){
    let config = ref({});

     const getConfig = async () => {
            try {
                const response = await axios.get('portal/getConfig');
                config.value = response.data.scanView;
                console.log('config', config);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
    }

    return {
        config,
        getConfig
    }
}