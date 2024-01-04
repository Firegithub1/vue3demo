/*
 * @Author: YiY
 * @Date: 2023-12-14 14:27:05
 * @LastEditTime: 2023-12-20 11:13:06
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { IRequestConfig, IRequestInterceptors, IResult } from './type';

class Request {
  instance: AxiosInstance
  interceptors?: IRequestInterceptors
  constructor(config: IRequestConfig){
    this.instance = axios.create(config)
    this.interceptors = config?.interceptors

    // 配置实例 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 默认 拦截器
    this.instance.interceptors.request.use(
      (config) => config, error => error
    )
    // 后添加的拦截器先执行
    this.instance.interceptors.response.use(
      res => {
        const realData = res.data
        if(res && realData && realData.code == "401"){
          window.location.href = "/"
          return Promise.reject(res)
        }
        return res
      },
      error => error
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T>{
    return new Promise((resolve,reject) => {
      // 1.请求config的处理
      // 2.是否显示loading、progress
      this.instance.request<any,T>(config)
      .then((res) =>{
        // l. 单个请求的响应数据处理
        // 2. 独立请求的showLoading
        resolve(res)
      })
      .catch(error => {
        // 失败也可以处理loading
        reject(error)
      })
      .finally(() => {
        // console.log("request.finally");
      })
    })
  }

  async post<T>(url: string, data: any, config?: any): Promise<IResult<T>>{
    const response = await this.instance.post<IResult<T>>(url,data,config)
    return response.data
  }

  async get<T>(url: string, params?: any): Promise<IResult<T>>{
    const response = await this.instance.get<IResult<T>>(url,params)
    return response.data
  }
}

export default Request