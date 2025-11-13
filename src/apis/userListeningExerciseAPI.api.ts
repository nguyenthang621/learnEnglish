import http from "@/utils/http";

const userListeningExerciseAPI = {
  submitAnswer: function (sentenceId: string, userAnswers: string[], userPassageId: string) {
    return http.post<any>('/api/user-listening-exercises/submit-answer', { sentenceId, userAnswers, userPassageId });
  },
  getExerciseBySentence: function (sentenceId: string) {
    return http.get<any>(`/api/user-listening-exercises/sentence/${sentenceId}`);
  },
    getMyProgress: function () {
    return http.get<any>(`/api/user-listening-exercises/my-progress`);
  }
};

export default userListeningExerciseAPI;
