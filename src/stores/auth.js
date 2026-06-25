import { defineStore } from "pinia";
import * as authApi from "@/api/auth";
import { asObject } from "@/utils/apiResponse";

export const useAuthStore =
defineStore("auth", {
  state: () => ({
    user: null,
    token:
      localStorage.getItem("token"),
  }),

  actions: {
    async login(data) {
      const res = await authApi.login(data);
      const payload = asObject(res);

      this.user = payload.user ?? null;
      this.token = payload.token ?? payload.access_token;

      localStorage.setItem("token", this.token);
    },

    setUser(user) {
      this.user = user;
    },

    async logout() {
      try {
        await authApi.logout();
      } finally {
        localStorage.removeItem("token");

        this.user = null;
        this.token = null;
      }
    },
  },
});
