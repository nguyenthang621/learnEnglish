import { QuizConfig, SubmitQuizResultDto } from "@/types/vocabulary.type";
import http from "@/utils/http";

const quizAPI = {
  getQuiz: function (limit: number) {
    return http.post<any>(`/api/quiz`, {limit});
  },
  genQuiz: function (payload: QuizConfig) {
    return http.post<any>(`/api/quiz/generate`, payload);
  },
  submitQuiz: function (payload: SubmitQuizResultDto) {
    return http.post<any>(`/api/quiz/submit`, payload);
  },
  getDueVocabularies: function (topicId?: string) {
    return http.get<any>(`/api/quiz/due`, { params: { topicId } });
  }
};

export default quizAPI;
