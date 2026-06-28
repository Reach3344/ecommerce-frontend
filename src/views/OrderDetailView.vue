<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getOrder } from "@/api/order";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import { asArray, asObject } from "@/utils/apiResponse";
import { lineTotal, money, orderTotal } from "@/utils/money";
import { fallbackProductImage, productImageUrl } from "@/utils/productImage";

const route = useRoute();
const order = ref(null);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const res = await getOrder(route.params.id);
    order.value = asObject(res, "order");
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load order.";
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
    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="order" class="stack">
      <div class="page-heading">
        <h1>Order #{{ order.id }}</h1>
        <strong>{{ order.status ?? "Pending" }}</strong>
      </div>

      <article v-for="item in asArray(order.items ?? order.order_items)" :key="item.id" class="line-item">
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
      </article>

      <div class="checkout-summary">
        <span>Total</span>
        <strong>${{ money(orderTotal(order)) }}</strong>
      </div>
    </div>
  </section>
</template>
