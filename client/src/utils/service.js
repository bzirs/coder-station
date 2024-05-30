import axios from "axios";
import {message} from "antd";


const service = axios.create({
    timeout: 5000,
    // baseURL: import.meta.env.VITE_BASE_URL,
})


service.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
})

service.interceptors.response.use(result => {
    const data = result.data;
    const {code, msg} = data

    if (code && code !== 0) {
        message.error(msg).then()

        return Promise.reject(msg)
    }
    return data;
}, error => {

    return Promise.reject(error);
})

export default service