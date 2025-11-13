import http from "@/utils/http";

const userapi = {
  getProfile: function () {
    return http.get<any>("/api/user/profile");
  }
};

export default userapi;
