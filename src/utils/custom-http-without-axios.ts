// import { StudentSentenceDto } from "@/pages/WritingSection/WritingSection";
// import { LocalStorage } from "./localStorage";
// import auth from "@/apis/auth.api";

// // Types cho API response
// interface ApiErrorResponse {
//   message: string;
//   error?: string;
// }

// // Hàm gọi API refresh token
// async function refreshToken(): Promise<string> {
//   try {
//     const refreshTokenValue = LocalStorage.getItemStorage("refreshToken");

//     if (!refreshTokenValue) {
//       throw new Error("No refresh token available");
//     }
//     const response: any = await auth.refreshToken();

//     if (response.status === 201) {
//       LocalStorage.setItemStorage("access_token", response.data.data.accessToken);
//     }

//     return response.data.data.accessToken;
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     LocalStorage.removeItemStorage("access_token");
//     LocalStorage.removeItemStorage("refreshToken");
//     // Redirect to login page
//     window.location.href = "/auth/login";
//     throw error;
//   }
// }

// // Interface cho options của fetch request
// interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
//   headers?: Record<string, string>;
// }

// // Hàm wrapper để gọi API với auto refresh
// async function apiRequestWithRefresh(
//   url: string,
//   options: ApiRequestOptions = {}
// ) {
//   const access_token = LocalStorage.getItemStorage("access_token");

//   // Gọi API lần đầu
//   let response: any = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(access_token && { Authorization: `Bearer ${access_token}` }),
//       ...options.headers,
//     },
//   });
//   // Nếu gặp lỗi 401 Unauthorized
//   if (response.status === 401 && response.statusText == "Unauthorized") {
//     console.log("----------------------1-----------------------");
//     try {
//       // Refresh token
//       const newToken = await refreshToken();
//       console.log("newToken: ", newToken);
//       // Gọi lại API với token mới
//       response = await fetch(url, {
//         ...options,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${newToken}`,
//           ...options.headers,
//         },
//       });
//     } catch (refreshError) {
//       // Nếu refresh thất bại, throw error
//       throw new Error("Authentication failed");
//     }
//   }

//   return response;
// }

// export async function callStreamingAPI(
//   requestBody: StudentSentenceDto
// ): Promise<Response> {
//   try {
//     const response = await apiRequestWithRefresh(
//       process.env.NEXT_PUBLIC_API_STREAMING,
//       {
//         method: "POST",
//         body: JSON.stringify(requestBody),
//       }
//     );

//     if (!response.ok) {
//       const errorData: ApiErrorResponse = await response.json();
//       throw new Error(
//         `API call failed: ${response.status} - ${errorData.message}`
//       );
//     }

//     return response;
//   } catch (error) {
//     console.error("API call error:", error);
//     throw error;
//   }
// }


// export async function callQuizAPI(
//   limit: number
// ): Promise<Response> {
//   try {
//     const response = await apiRequestWithRefresh(
//       process.env.NEXT_PUBLIC_API_QUIZ,
//       {
//         method: "POST",
//         body: JSON.stringify({limit}),
//       }
//     );

//     if (!response.ok) {
//       const errorData: ApiErrorResponse = await response.json();
//       throw new Error(
//         `API call failed: ${response.status} - ${errorData.message}`
//       );
//     }

//     return response;
//   } catch (error) {
//     console.error("API call error:", error);
//     throw error;
//   }
// }