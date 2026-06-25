<script setup>
import { onMounted, ref } from "vue";
import { useWishlistStore } from "@/stores/wishlist";
import ProductCard from "@/components/ProductCard.vue";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";

const wishlist = useWishlistStore();
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await wishlist.fetchWishlist();
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load wishlist.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container">
    <h1>Wishlist</h1>

    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="wishlist.items.length" class="product-grid">
      <div v-for="item in wishlist.items" :key="item.id" class="stack">
        <ProductCard :product="item.product ?? item" />
        <button class="button danger" type="button" @click="wishlist.remove(item.product_id ?? item.id)">
          Remove
        </button>
      </div>
    </div>

    <p v-else class="empty-state">No wishlist items yet.</p>
  </section>
</template>
