import Request from './request/index';
import localCache from '../utils/cache';
import router from '@/router';

const request = new Request({
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求失败的拦截")
      return err
    },
    responseInterceptor: config => {
      const realData = config.data
      if (realData && realData.code == '401') {
        localCache.deleteCache("token")
        router.push({ path: "/" })
      }
      return config
    },
    responseInterceptorCatch: (err) => {
      // console.log("请求失败的拦截")
      return err
    },
  }
})

export default request
