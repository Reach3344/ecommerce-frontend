<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useWishlistStore } from "@/stores/wishlist";
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
const auth = useAuthStore();
const wishlist = useWishlistStore();
const router = useRouter();
const route = useRoute();
const isTogglingLike = ref(false);

const wishlistProductIds = computed(() =>
  wishlist.items.map((item) => item.product_id ?? item.product?.id ?? item.id)
);
const isLiked = computed(() => wishlistProductIds.value.includes(props.product.id));

const useFallbackImage = (event) => {
  event.target.src = fallbackProductImage;
};

const toggleLike = async () => {
  if (!auth.token) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }

  if (isTogglingLike.value) return;

  isTogglingLike.value = true;

  try {
    if (isLiked.value) {
      await wishlist.remove(props.product.id);
    } else {
      await wishlist.add(props.product.id);
    }
  } finally {
    isTogglingLike.value = false;
  }
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

    <button
      class="product-like-button"
      :class="{ active: isLiked }"
      type="button"
      :aria-label="isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`"
      :aria-pressed="isLiked"
      :disabled="isTogglingLike"
      @click="toggleLike"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    </button>

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
