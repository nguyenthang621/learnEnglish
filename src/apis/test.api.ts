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
}

export default testAPI