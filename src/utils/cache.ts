/*
 * @Author: YiY
 * @Date: 2023-12-14 14:56:08
 * @LastEditTime: 2023-12-14 16:09:49
 */
class LocalCache{
  setCache(key: string, value: any){
    localStorage.setItem(key,JSON.stringify(value))
  }
  getCache(key: string){
    const value = localStorage.getItem(key)
    if(value){
      const res = JSON.parse(value)
      return res
    } else {
      localStorage.removeItem(key)
    }
  }
  deleteCache(key: string){
    localStorage.removeItem(key)
  }
  clearCache(){
    localStorage.clear()
  }
}

export default new LocalCache()
