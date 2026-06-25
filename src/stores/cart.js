import { defineStore } from "pinia";
import * as cartApi from "@/api/cart";
import { asArray, asObject } from "@/utils/apiResponse";
import { lineTotal } from "@/utils/money";

export const useCartStore =
defineStore("cart", {
  state: () => ({
    items: [],
    total: 0,
  }),

  actions: {
    async fetchCart() {
      const res = await cartApi.getCart();
      const payload = asObject(res);

      this.items = asArray(payload, "items").length
        ? asArray(payload, "items")
        : asArray(payload, "cart_items");
      this.total = Number(
        payload.total ??
          payload.total_amount ??
          payload.subtotal ??
          this.items.reduce((sum, item) => sum + lineTotal(item), 0)
      );
    },

    async add(productId, quantity = 1) {
      await cartApi.addToCart({
        product_id: productId,
        quantity,
      });

      await this.fetchCart();
    },

    async update(id, quantity) {
      await cartApi.updateCart(id, { quantity });

      await this.fetchCart();
    },

    async remove(id) {
      await cartApi.removeCart(id);

      await this.fetchCart();
    },
  },
});
