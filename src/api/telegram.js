import { lineTotal, money } from "@/utils/money";

const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const productName = (item) => item.product?.name ?? item.name ?? "Product";

const itemQuantity = (item) => Number(item.quantity ?? item.qty ?? 1);

const buildOrderMessage = ({ form, items, order, total }) => {
  const orderId = order?.id ? `#${order.id}` : "New order";
  const itemLines = items.length
    ? items
        .map(
          (item) =>
            `- ${productName(item)} x${itemQuantity(item)} ($${money(lineTotal(item))})`
        )
        .join("\n")
    : "- No cart items available";

  return [
    `Buy done: ${orderId}`,
    "",
    `Customer: ${form.shipping_name}`,
    `Phone: ${form.phone}`,
    `Address: ${form.shipping_address}`,
    `Payment: ${form.payment_method}`,
    "",
    "Items:",
    itemLines,
    "",
    `Total: $${money(order?.total ?? order?.total_amount ?? total)}`,
  ].join("\n");
};

export const sendTelegramOrderMessage = async (orderData) => {
  if (!botToken || !chatId) {
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildOrderMessage(orderData),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Telegram notification failed.");
  }
};
