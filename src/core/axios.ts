import axios from "axios";
import {parseCookies} from "nookies";

axios.defaults.baseURL = 'http://localhost:4221'

axios.interceptors.request.use((config) => {
    if(typeof window !== "undefined") {
        const {access_token} = parseCookies()
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
})

export default axios