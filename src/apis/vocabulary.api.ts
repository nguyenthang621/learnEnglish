import { VocabularyListQuery, WordData } from "@/types/vocabulary.type";
import http from "@/utils/http";
import { SearchPayload } from "@/types/utils.type";

const vocabularyAPI = {
  searchVocabulary: function (text: string, from: string, to: string) {
    return http.get<any>(`/api/translate?text=${text}&from=${from}&to=${to}`);
  },
  // getMyVocabulary: function (params?: VocabularyListQuery) {
  //   const query = qs.stringify(params ?? {}, {
  //     skipNull: true,
  //     skipEmptyString: true,
  //   });
  //   return http.get<any>(
  //     `/api/vocabulary/my-vocabulary/list${query ? "?" + query : ""}`
  //   );
  // },
  addVocabulary: function (wordData: WordData) {
    return http.post<any>(`/api/vocabulary/my-vocabulary`, wordData);
  },
  getGroupVocvabulary: function ({page, limit}: SearchPayload) {
    return http.get<any>(`/vocabulary/groups?page=${page}&limit=${limit}`);
  },
  getVocvabularyByTopic: function (data: {page: number, limit: number, topicid: string}) {
    return http.get<any>(`/api/vocabulary/bytopic?page=${data.page}&limit=${data.limit}&topic=${data.topicid}`);
  },
  getBookmarkCollections: function () {
    return http.get<any>(`/auth/bookmark-collections`);
  },
  getDeatilBookmarkCollections: function (id: number) {
    return http.get<any>(`/auth/bookmark-collections/${id}`);
  }
};

export default vocabularyAPI;
