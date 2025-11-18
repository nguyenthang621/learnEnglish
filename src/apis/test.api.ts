import http from '@/utils/http'


const testAPI = {
  getTests: function (options: {
    page?: number;
    limit?: number;
    level_id?: number;
    test_type_id?: string;
    search?: string;
    } = {}) {

    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
        }
    });

    return http.get(`/auth/tests?${params.toString()}`);
    },

    getDetailTest: function(testId: number){
        return http.get<any>(`/auth/tests/${testId}`)
    },
    startTest: function(testId: number){
        return http.post<any>(`/auth/tests/${testId}/start`)
    },
    saveAnswer: function(testId: number, question_id: number, answer: any, time_taken_seconds: number){
        return http.post<any>(`/auth/test-attempts/${testId}/answer`, {
            question_id,
            answer,
            time_taken_seconds
        })
    }
}

export default testAPI