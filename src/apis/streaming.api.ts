import { StudentSentenceDto } from "@/pages/WritingSection/WritingSection";
import http from "@/utils/http";

const streamingAPI = {
  studentTranslation: function (requestBody: StudentSentenceDto) {
    return http.post(`/api/chat/student/translation/stream`, requestBody);
  },
};

export default streamingAPI;
