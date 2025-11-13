import http from "@/utils/http";

const shadowingAPI = {
  getShadowExercise: function (id: string, includeSegments: boolean ) {
    return http.get<any>(`/api/shadowing-exercises/${id}?includeSegments=${includeSegments}`);
  },
  getShadowExercises: function (page: number, limit: number ) {
    return http.get<any>(`/api/shadowing-exercises?includeDeleted=false&page=${page}&limit=${limit}`);
  },
};

export default shadowingAPI;
