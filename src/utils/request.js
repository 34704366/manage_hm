import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// const HTTP_CODE_SUCCESS = 200
const STATUS_CODE_SUCCESS = 20000

const FAILED_TOAST_DURATION = 5000

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API,   // api的base_url
    baseURL: 'http://127.0.0.1:4523/mock/1223322',   // mock服务器
    timeout: 5000   // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        console.log('请求拦截器：',config)

        // do something before request is sent
        if (store.getters.token) {
            // set token
            config.headers['X-Token'] = getToken();
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error);
        return Promise.reject(error);
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        // console.log('响应拦截器：',response)
        
        const res = response.data;

        if (res.statusCode != STATUS_CODE_SUCCESS) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: FAILED_TOAST_DURATION
            });
            console.log(res);

            // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()   // 刷新页面
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res;
        }
    },
    error => {
        console.log('err' + error);
        Message({
            message: error.message || 'unknown error',
            type: 'error',
            duration: FAILED_TOAST_DURATION
        })
        return Promise.reject(error);
    }
)


export default service

