import api from "./axios";

export const checkout = (data) =>
  api.post("/checkout", data);