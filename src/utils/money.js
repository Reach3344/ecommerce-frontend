export const money = (value) =>
  Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const lineTotal = (item) => {
  const quantity = Number(item.quantity ?? item.qty ?? 1);
  const price = Number(item.price ?? item.product?.price ?? item.unit_price ?? 0);

  return Number(item.total ?? item.subtotal ?? price * quantity);
};

export const orderTotal = (order) =>
  Number(order?.total ?? order?.total_amount ?? order?.amount ?? order?.grand_total ?? 0);
