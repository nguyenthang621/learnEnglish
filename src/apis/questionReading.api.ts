import http from "@/utils/http";

const questionsReadingAPI = {
  getQuestionsReading: function (passageId: string, includeInactive = true) {
    return http.get<any>(`/api/questions?passageId=${passageId}&includeInactive=${includeInactive}`);
  },
  checkAnswer: function (questionId: string, answer: string, userPassageId: string) {
    return http.post<any>(`/api/questions/${questionId}/check`, { userAnswer: answer,  userPassageId});
  }
};

export default questionsReadingAPI;
