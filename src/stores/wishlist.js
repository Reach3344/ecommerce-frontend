import { defineStore } from "pinia";
import * as wishlistApi from "@/api/wishlist";
import { asArray } from "@/utils/apiResponse";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: [],
  }),

  actions: {
    async fetchWishlist() {
      const res = await wishlistApi.getWishlist();

      this.items = asArray(res, "items");
    },

    async add(productId) {
      await wishlistApi.addWishlist(productId);

      await this.fetchWishlist();
    },

    async remove(productId) {
      await wishlistApi.removeWishlist(productId);

      await this.fetchWishlist();
    },
  },
});
