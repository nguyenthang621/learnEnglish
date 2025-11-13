import http from "@/utils/http";

const translateAPI = {
  translateVocabulary: function (text: string, from: string, to: string) {
    return http.get<any>(`/api/translate?text=${text}&sl=${from}&dl=${to}`);
  },
};

export default translateAPI;
