import http from '@/utils/http'


const courseAPI = {
  getFeaturedCourse: function (limit: number) {
    return http.get<any>(`/courses/featured?limit=${limit}`)
  },
  getCourses: function (options: {
    page?: number;
    limit?: number;
    level_id?: number;
    category_id?: string;
    sort?: string;
    is_free?: string;
    is_vip_only?: string;
    is_featured?: string;
    search?: string;
    } = {}) {

    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
        }
    });

    return http.get(`/courses?${params.toString()}`);
    },
    getDetailCourse: function(courseId: string){
        return http.get<any>(`/courses/${courseId}`)
    },
    getDetailLesson: function(courseId: number, lessonId: number){
        return http.get<any>(`/courses/${courseId}/lessons/${lessonId}`)
    },
    getLessons: function(courseId: number){
        return http.get<any>(`/courses/${courseId}/lessons`)
    }

}

export default courseAPI
