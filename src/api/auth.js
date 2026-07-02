import api from "./axios";

const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const googleAuthBase = import.meta.env.VITE_GOOGLE_AUTH_URL ?? `${apiBase}/auth/google`;

export const login = (data) =>
  api.post("/login", data);

export const register = (data) =>
  api.post("/register", data);

export const logout = () =>
  api.post("/logout");

export const googleAuthUrl = (callbackUrl = `${window.location.origin}/auth/callback`) =>
  `${googleAuthBase}?redirect=${encodeURIComponent(callbackUrl)}`;
