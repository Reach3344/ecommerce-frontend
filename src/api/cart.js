import api from "./axios";

export const getCart = () =>
  api.get("/cart");

export const addToCart = (data) =>
  api.post("/cart", data);

export const updateCart = (id, data) =>
  api.put(`/cart/${id}`, data);

export const removeCart = (id) =>
  api.delete(`/cart/${id}`);