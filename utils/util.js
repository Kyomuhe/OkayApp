import Toast from "react-native-toast-message";
import {ServerUrl} from '../config/config'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const showToast = (message, type) => {
    switch (type) {
        case 'success':
            return Toast.show( {
                type: 'success',
                text1: message,
                visibilityTime: 4000,
                position: 'top',
            });
        case 'error':
            return Toast.show( {
                visibilityTime: 4000,
                type: 'error',
                text1: message,
                position: 'top',

            });
        default:
            return Toast.show({
                type: 'info',
                text1: message,
                visibilityTime: 4000,
                position: 'top',
            });
    }
}

export const makeRequest = async (ACTION, SERVICE, data) => {
    try {
        let url = ServerUrl;
        console.log('Making request to:', url); 
        const payload = { ACTION, SERVICE, ...data };

        let config = {
            headers: { "Content-Type": "application/json" }
        };
        const response = await axios.post(url, payload, config);
        console.log('Response:', response.data); 
        return response.data;

    } catch (error) {
        console.log('Error details:', error); 
        if (error.response) {
            throw error.response.data || error;
        } else {
            throw new Error(error.message);
        }
    }
}

export const getAcessToken = async () =>{
    return await AsyncStorage.getItem('accessToken');
}

export const makeAuthenticatedRequest = async (ACTION, SERVICE, data) => {
    let accessToken = await getAcessToken();
    try{
        let url = ServerUrl

        const payload = {ACTION, SERVICE, ...data};

        let config ={
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`

            }
        };
        const response = await axios.post(url, payload, config);
        console.log("request was successful");
        return response.data;
    }catch(error){
        console.error("Error making authenticated request:", error);

        if(error.response){
            const errorMessage = error.response.data || error;
            showToast(`Error: ${errorMessage}`, 'error');
            throw errorMessage;
        }else{
            showToast(`Error: ${error.message}`, 'error');
            throw new Error(error.message)
        }

    }
}