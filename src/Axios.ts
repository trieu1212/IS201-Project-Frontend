import axios from "axios";


const instance = axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
})

instance.interceptors.request.use(function (config) {
    config.headers["Content-Type"] = "application/json";
    let data= localStorage.getItem("persist:root"||"{}")
    data = JSON.parse(data||"{}")
    let app = JSON.parse(data.app||"{}")
    const accessToken = app.accessToken
    if(accessToken){
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default instance