<script setup>
import { computed } from "vue";
import { fallbackProductImage, productImageUrl } from "@/utils/productImage";
import { money } from "@/utils/money";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const imageUrl = computed(() => productImageUrl(props.product));
const categoryName = computed(() => props.product.category?.name ?? props.product.category ?? "Fresh produce");
const shortDescription = computed(() => props.product.description || "Freshly selected and ready for delivery.");

const useFallbackImage = (event) => {
  event.target.src = fallbackProductImage;
};
</script>

<template>
  <article class="product-card">
    <router-link class="product-image-link" :to="`/products/${product.id}`">
      <img
        :src="imageUrl"
        :alt="product.name"
        class="product-image"
        loading="lazy"
        @error="useFallbackImage"
      />
    </router-link>

    <div class="product-body">
      <span class="product-category">{{ categoryName }}</span>
      <h3>{{ product.name }}</h3>
      <p class="muted">{{ shortDescription }}</p>

      <div class="product-footer">
        <strong>${{ money(product.price) }}</strong>
        <router-link class="button product-button" :to="`/products/${product.id}`">
          View
        </router-link>
      </div>
    </div>
  </article>
</template>
