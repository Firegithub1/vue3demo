/*
 * @Author: YiY
 * @Date: 2023-12-14 13:41:31
 * @LastEditTime: 2024-01-04 15:52:03
 */
import request from '@/services/index'
import * as api from '@/common/api';

export function login(username:String, password:String) {
  return request.post(api.login,{
    username: username,
    password: password
  })
}