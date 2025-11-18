import http from "@/utils/http";

const userapi = {
  getProfile: function () {
    return http.get<any>("/api/user/profile");
  },
  initHome: function () {
    return http.get<any>("/app/home/config");
  },
};

export default userapi;
