import {UPLOAD_IMAGE} from "./types";
import axios from "axios";

export const uploadImage = (imageData, idUser) => async dispatch => {
    if (imageData.entries().next().value[1] !== null) {
        const response = await axios.post(axios.defaults.baseURL + `/uploadFiles/`+idUser, imageData, {
            onUploadProgress:progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }
        });
        dispatch({
            type: UPLOAD_IMAGE,
            payload: response.data
        });
    }
};