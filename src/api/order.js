import api from "./axios";

export const getOrders = () =>
  api.get("/orders");

export const getOrder = (id) =>
  api.get(`/orders/${id}`);