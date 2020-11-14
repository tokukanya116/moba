import Vue from 'vue';
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 响应拦截器:用于拦截响应(必须全局,以减少不必要的报错)
http.interceptors.response.use(res => {
    return res
}, err => {
    // 如果捕获到错误信息,才报错
    if ( err.response.data.message ){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        });
    }
    return Promise.reject(err);
})
export default http