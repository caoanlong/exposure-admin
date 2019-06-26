import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import Store from '../store'

const JSONbig = require('json-bigint')

export const baseURL = process.env.VUE_APP_BASE_URI

const errCode = [
    '401' // 登录已失效，请重新登录
]

// create an axios instance
const service = axios.create({
    baseURL, // api的base_url
    timeout: 10000, // request timeout
    transformResponse: data => JSONbig.parse(data)
})

service.interceptors.request.use(config => {
    const authorization = Store.state.sysUser.authorization
    if (authorization) config.headers['Authorization'] = authorization
    return config
}, error => {
    // Do something with request error
    console.log(error)
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(res => {
    if (errCode.includes(res.data.code)) {
        Message.error(res.data.msg)
        return Promise.reject(res.data.msg)
    }
    if (res.data.code == 200) return res
    Message.error(res.data.msg)
    return Promise.reject(res.data.msg)
}, err => {
    Message.error('网络连接错误，请稍后重试')
    return Promise.reject(err.toString())
})

export default service