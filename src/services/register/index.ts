/*
 * @Author: YiY
 * @Date: 2023-12-14 13:41:31
 * @LastEditTime: 2023-12-14 17:57:50
 */
import request from '@/services/index'
import * as api from '@/common/api';

export function register(username:String, password:String, phone: String) {
  return request.post(api.register,{
    username: username,
    password: password,
    phone: phone
  })
}