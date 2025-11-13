import { PassageResponses } from '@/types/passage.type'
import http from '@/utils/http'


const lessonAPI = {
  getPassage: function (passage_id: string) {
    return http.get<PassageResponses>(`/api/passages/${passage_id}`)
  },
  getCategories: function (page: number, limit: number) {
    return http.get<any>(`/api/categories?page=${page}&limit=${limit}`)
  }
}

export default lessonAPI
