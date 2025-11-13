import {
  SentenceTranslationRequest,
  SentenceTranslationResponses,
  suggestPayload,
  SuggestResult,
} from "@/types/sentence.type";
import { SuccessResponseApi } from "@/types/utils.type";
import http from "@/utils/http";

const sentenceAPI = {
  handleSubmitTranslation: function (payload: SentenceTranslationRequest) {
    return http.post<SentenceTranslationResponses>(
      `/api/sentences/submit-translation`,
      payload
    );
  },
  suggestSentence: function (payload: suggestPayload) {
    return http.post<SuccessResponseApi<SuggestResult>>(
      `/api/chat/suggest`,
      payload
    );
  },
};

export default sentenceAPI;
