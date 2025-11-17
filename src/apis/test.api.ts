import http from '@/utils/http'


const testAPI = {
  getTests: function (limit: number) {
    return http.get<any>(`/test?limit=${limit}`)
  }

}

export default testAPI
