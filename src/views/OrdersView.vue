<script setup>
import { onMounted, ref } from "vue";
import { getOrders } from "@/api/order";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import { asArray } from "@/utils/apiResponse";
import { money, orderTotal } from "@/utils/money";
import { fallbackProductImage, productImageUrl } from "@/utils/productImage";

const orders = ref([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const res = await getOrders();
    orders.value = asArray(res, "orders");
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load orders.";
  } finally {
    loading.value = false;
  }
});

const orderItems = (order) => asArray(order.items ?? order.order_items);

const productForItem = (item) => item.product ?? item;

const useFallbackImage = (event) => {
  event.target.src = fallbackProductImage;
};
</script>

<template>
  <section class="container">
    <div class="page-heading">
      <h1>Orders</h1>
      <p>Track your purchases and view order details.</p>
    </div>

    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="orders.length" class="stack">
      <router-link v-for="order in orders" :key="order.id" class="line-item" :to="`/orders/${order.id}`">
        <div class="order-preview">
          <div v-if="orderItems(order).length" class="order-preview-images">
            <img
              v-for="item in orderItems(order).slice(0, 3)"
              :key="item.id ?? item.product?.id ?? item.product_id"
              :src="productImageUrl(productForItem(item))"
              :alt="item.product?.name ?? item.name ?? 'Product image'"
              class="order-preview-image"
              loading="lazy"
              @error="useFallbackImage"
            />
          </div>

          <div>
            <h3>Order #{{ order.id }}</h3>
            <p>{{ order.status ?? "Pending" }}</p>
          </div>
        </div>
        <strong>${{ money(orderTotal(order)) }}</strong>
      </router-link>
    </div>

    <p v-else class="empty-state">No orders yet.</p>
  </section>
</template>
