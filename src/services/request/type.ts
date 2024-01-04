/*
 * @Author: YiY
 * @Date: 2023-12-14 14:57:02
 * @LastEditTime: 2023-12-14 16:06:48
 */
/*
 * @Author: YiY
 * @Date: 2023-12-14 14:21:14
 * @LastEditTime: 2023-12-14 14:30:56
 */
import type {
  CreateAxiosDefaults,
  InternalAxiosRequestConfig, //包含header信息
  AxiosResponse
} from 'axios';

// 拦截器
export interface IRequestInterceptors {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config:AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

// 请求配置
export interface IRequestConfig extends CreateAxiosDefaults {
  // 可选填：专属拦截器
  interceptors?: IRequestInterceptors
}

// 响应体
export interface IResult<T>{
  code: number
  data: T
  message: string
}