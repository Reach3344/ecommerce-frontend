import api from "./axios";

export const getWishlist = () =>
  api.get("/wishlist");

export const addWishlist = (id) =>
  api.post(`/wishlist/${id}`);

export const removeWishlist = (id) =>
  api.delete(`/wishlist/${id}`);