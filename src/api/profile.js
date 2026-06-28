import api from "./axios";

export const getProfile = () =>
  api.get("/profile");

export const updateProfile = (data) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return api.post("/profile", data);
  }

  return api.put("/profile", data);
};

export const changePassword = (data) =>
  api.post("/change-password", data);
