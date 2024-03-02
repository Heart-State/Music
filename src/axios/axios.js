import axios from 'axios'
axios.defaults.baseURL = `https://music-api-liart-kappa.vercel.app`
// axios.defaults.baseURL = `http://192.168.42.33:8080/`
// axios.defaults.baseURL = `http://192.168.10.21:8080/`
// axios.defaults.baseURL = `api/`


axios.interceptors.request.use(
    config=>{
        if(config.url != '/login'){//这里有很多开放的接口请求的时候也带了token，而这个时候的token其实是没有的
            config.headers.token = window.localStorage.getItem("token");
            if(config.url != 'admin/login' && /admin/.test(config.url)){
                config.headers.adminToken = window.localStorage.getItem("admin_token");
            }
        }
        return config;
    },
    error=>Promise.reject(error)
)

export default axios