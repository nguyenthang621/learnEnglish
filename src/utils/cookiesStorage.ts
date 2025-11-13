// src/utils/CookiesStorage.ts
export const CookiesStorage = {
  getItem: (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  },

  setItem: (name: string, value: string, days = 7) => {
    if (typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  },

  removeItem: (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },

  clear: () => {
    CookiesStorage.removeItem("access_token");
    CookiesStorage.removeItem("refresh_token");
    CookiesStorage.removeItem("profile");
  }
};
