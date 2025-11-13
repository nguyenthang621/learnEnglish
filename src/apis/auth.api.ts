import { CookiesStorage } from "@/utils/cookiesStorage";
import http from "@/utils/http";


const auth = {
  loginAccount: function (body: { email: string; password: string }) {
    return http.post<any>("/auth/login", body);
  },
  registerAccount: function (body: { email: string; password: string, password_confirmation: string, name: string }) {
    return http.post<any>("/auth/register", body);
  },
  verifyOtp: function (body: { email: string; otp: string }) {
    return http.post<any>("/auth/verify-email", body);
  },
  logoutAccount: function () {
    return http.post("/logout");
  },
  refreshToken: function () {
    try {
      const refresh_token = CookiesStorage.getItem("refresh_token");
      return http.post("/api/auth/user/refresh-token", { refresh_token });
    } catch (error) {
      CookiesStorage.clear();
      window.location.href = "/auth/login";
      throw error;
    }
  },

  loginGoogleAccount: function () {
    const url = process.env.NEXT_PUBLIC_GOOGLE_AUTH_API;
    if (!url) {
      console.error("NEXT_PUBLIC_GOOGLE_AUTH_API is not defined");
      return;
    }
    window.location.href = url;
  },
};

export default auth;
