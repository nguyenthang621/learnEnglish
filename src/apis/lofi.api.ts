import { StructureScenesResponses } from "@/types/lofi.type";
import { SuccessResponseApi } from "@/types/utils.type";
import http from "@/utils/http";

const lofiAPI = {
  getScenesStructure: function () {
    return http.get<StructureScenesResponses>(`/api/scenes`);
  },
  geListEffect: function () {
    return http.get<SuccessResponseApi<string[]>>(`/api/effects`);
  },
  geListSongs: function () {
    return http.get<SuccessResponseApi<Record<string, string[]>>>(`/api/songs`);
  },
};

export default lofiAPI;
