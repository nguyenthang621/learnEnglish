import { VocabularyListQuery, WordData } from "@/types/vocabulary.type";
import http from "@/utils/http";
import { SearchPayload } from "@/types/utils.type";
import { desc } from "framer-motion/client";

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
  getDetailGroupVocvabulary: function (groupId: number) {
    return http.get<any>(`/vocabulary/groups/${groupId}`);
  },
  getVocvabularyByTopic: function (data: {page: number, limit: number, topicid: string}) {
    return http.get<any>(`/api/vocabulary/bytopic?page=${data.page}&limit=${data.limit}&topic=${data.topicid}`);
  },
  getBookmarkCollections: function () {
    return http.get<any>(`/auth/bookmark-collections`);
  },
  deleteBookmarkCollections: function (id: number) {
    return http.post<any>(`/auth/bookmark-collections/${id}/delete`);
  },
  ceateBookmarkCollections: function ({name, description, is_default}: {name: string, description: string, is_default: boolean}) {
    return http.post<any>(`/auth/bookmark-collections`,{ name: name , description: description, is_default: is_default});
  },
  updateBookmarkCollections: function ({name, description, is_default, collection_id}: {name: string, description: string, is_default: boolean, collection_id: number}) {
    return http.post<any>(`/auth/bookmark-collections/${collection_id}`,{ name: name , description: description, is_default: is_default});
  },
  getDeatilBookmarkCollections: function (id: number) {
    return http.get<any>(`/auth/bookmark-collections/${id}`);
  },
  deleteVocabularyCollections: function (vocabularyId: number, collection_id: number) {
    return http.post<any>(`/auth/vocabularies/${vocabularyId}/bookmark/delete`, {collection_id});
  },

  createVocabulary: function ({
    word,
    pronunciation,
    definition_vi,
    personal_note,
    collection_id,
    examples,
  }: {
    word: string;
    pronunciation: string;
    definition_vi: string;
    personal_note: string;
    collection_id: number;
    examples: {
      vocabulary_type: number;
      english_example_sentences: string;
      vietnamese_translation: string;
    }[];
  }) {
    const formData = new FormData();

    formData.append("word", word);
    formData.append("pronunciation", pronunciation);
    formData.append("definition_vi", definition_vi);
    formData.append("personal_note", personal_note);
    formData.append("collection_id", String(collection_id));

    examples.forEach((ex, i) => {
      formData.append(`examples[${i}][vocabulary_type]`, String(ex.vocabulary_type));
      formData.append(`examples[${i}][english_example_sentences]`, ex.english_example_sentences);
      formData.append(`examples[${i}][vietnamese_translation]`, ex.vietnamese_translation);
    });

    return http.post(`/auth/create-vocabulary`, formData);
  },

};

export default vocabularyAPI;
