import axios, { AxiosInstance, HttpStatusCode } from "axios";
import { path } from "@/constants/paths";
import { toast } from "react-toastify";
import auth from "@/apis/auth.api";
import { CookiesStorage } from "./cookiesStorage";
// import { context, defaultTextMapSetter, propagation, trace } from "@opentelemetry/api";

class Http {
  instance: AxiosInstance;
  private access_token: string | null;
  private refresh_token: string | null;
  private profile: string | null;
  private refresh_tokenRequest: any;
  private handleLogout: () => void;

  constructor() {
    this.access_token = CookiesStorage.getItem("access_token");
    this.refresh_token = CookiesStorage.getItem("refresh_token");
    // this.profile = JSON.parse(CookiesStorage.getItem("profile") as string);
    this.profile = CookiesStorage.getItem("profile")
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API,
      // withCredentials: true,
      timeout: 7000,
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
        "X-Client-Secret": process.env.NEXT_PUBLIC_CLIENT_SECRET,
        // "Access-Control-Allow-Origin": "http://localhost:3000",
        // "Access-Control-Allow-Credentials": true

      },
    });
    this.refresh_tokenRequest = null;
    this.handleLogout = () => {
      this.access_token = null;
      this.refresh_token = null;
      this.profile = null;
      // CookiesStorage.clear();
      CookiesStorage.removeItem('access_token')
      CookiesStorage.removeItem('refresh_token')
      CookiesStorage.removeItem('profile')
      window.location.href = "/auth/login";
    };
    // Add a request interceptor
    this.instance.interceptors.request.use((config) => {
      if (this.access_token) {
        config.headers.authorization = `Bearer ${this.access_token}`;
        return config;
      }

      return config;
    });

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (
          url === path.login ||
          // url === path.register ||
          url === "/api/auth/user/sign-in"
        ) {
          const data = response as any;
          this.access_token = data.data.access_token;
          this.refresh_token = data.data.refresh_token;
          this.profile = String(data.data.user);

          CookiesStorage.setItem("access_token", this.access_token || "");
          CookiesStorage.setItem("refresh_token", this.refresh_token || "");
          CookiesStorage.setItem("profile", JSON.stringify(this.profile));
        } else if (url === path.logout) {
          this.handleLogout();
        }

        return response;
      },
      (error) => {
        if (error?.response?.status === HttpStatusCode.InternalServerError) {
          const data: any | undefined = error.response?.data;
          if (!data) {
            toast.error("Server có lỗi.");
            return Promise.reject(error);
          }
          const message = data.message || error.message;
          toast.error(message);
        }
        // Xử lý refresh token
        else if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthorized"
        ) {
          this.refresh_tokenRequest = this.refresh_tokenRequest
            ? this.refresh_tokenRequest
            : auth.refreshToken().finally(() => {
                this.refresh_tokenRequest = null;
              });
          //
          return this.refresh_tokenRequest
            .then((data: any) => {
              const { access_token } = data.data.data;
              this.access_token = access_token;
              CookiesStorage.setItem("access_token", access_token);

              error.response.config.Authorization = `Bearer ${access_token}`;
              return this.instance(error.response.config); // tiếp tục gọi api
            })
            .catch((refresh_tokenError: any) => {
              throw refresh_tokenError;
            });
        } else if (
          error.response.status === 401 &&
          error?.response?.data?.message === "Unauthorized"
        ) {
          this.handleLogout();
          return;
        }
        toast.warn(error?.response?.data?.message);
        // this.handleLogout();

        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
