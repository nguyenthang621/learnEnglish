import { CompleteSegment } from "@/types/dictation.type";
import http from "@/utils/http";

const dictationAPI = {
  checkDictation: function (exerciseId: string, payload: CompleteSegment) {
    return http.put<any>(`/api/user-segment-progress/exercise/${exerciseId}/complete-segment`, payload);
  }
};

export default dictationAPI;
