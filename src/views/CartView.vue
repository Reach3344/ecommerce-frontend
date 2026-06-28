<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import { lineTotal, money } from "@/utils/money";
import { fallbackProductImage, productImageUrl } from "@/utils/productImage";

const cart = useCartStore();
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await cart.fetchCart();
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load cart.";
  } finally {
    loading.value = false;
  }
});

const productForItem = (item) => item.product ?? item;

const useFallbackImage = (event) => {
  event.target.src = fallbackProductImage;
};
</script>

<template>
  <section class="container">
    <div class="page-heading">
      <h1>Your Cart</h1>
      <router-link v-if="cart.items.length" class="button" to="/checkout">Checkout</router-link>
    </div>

    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="cart.items.length" class="stack">
      <article v-for="item in cart.items" :key="item.id" class="line-item">
        <div class="cart-product">
          <img
            :src="productImageUrl(productForItem(item))"
            :alt="item.product?.name ?? item.name ?? 'Product image'"
            class="cart-product-image"
            loading="lazy"
            @error="useFallbackImage"
          />

          <div>
            <h3>{{ item.product?.name ?? item.name }}</h3>
            <p>Qty: {{ item.quantity ?? item.qty ?? 1 }}</p>
          </div>
        </div>

        <strong>${{ money(lineTotal(item)) }}</strong>

        <div class="button-row">
          <button class="button secondary" type="button" @click="cart.update(item.id, Math.max(1, item.quantity - 1))">
            -
          </button>
          <button class="button secondary" type="button" @click="cart.update(item.id, item.quantity + 1)">
            +
          </button>
          <button class="button danger" type="button" @click="cart.remove(item.id)">
            Remove
          </button>
        </div>
      </article>

      <div class="checkout-summary">
        <span>Total</span>
        <strong>${{ money(cart.total) }}</strong>
      </div>
    </div>

    <p v-else class="empty-state">Your cart is empty.</p>
  </section>
</template>
