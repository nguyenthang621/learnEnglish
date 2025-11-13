import {  PassageResponses, PassagesResponses } from "@/types/passage.type";
import { SkillType } from "@/types/utils.type";
import http from "@/utils/http";

const passageAPI = {
  getPassage: function (passage_id: string) {
    return http.get<PassageResponses>(`/api/passages/${passage_id}`);
  },
  getPassageReading: function (passage_id: string) {
    return http.get<PassageResponses>(`/api/passages/${passage_id}/reading`);
  },
  getPassageForListening: function (passage_id: string) {
    return http.get<PassageResponses>(`/api/passages/listening/${passage_id}`);
  },
  getListPassage: function (page: number, limit: number) {
    return http.get<PassagesResponses>(`/api/passages?page=${page}&limit=${limit}`);
  },
  startPassage: function (passage_id: string, type: SkillType) {
    return http.get<any>(`/api/passages/${passage_id}/start/${type}`);
  },
};

export default passageAPI;
