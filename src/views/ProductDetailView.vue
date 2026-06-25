<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProduct } from "@/api/catalog";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import ReviewCard from "@/components/ReviewCard.vue";
import { asArray, asObject } from "@/utils/apiResponse";
import { fallbackProductImage, productImageUrl } from "@/utils/productImage";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();
const wishlist = useWishlistStore();

const product = ref(null);
const loading = ref(true);
const error = ref("");
const quantity = ref(1);
const actionMessage = ref("");

const imageUrl = computed(() => productImageUrl(product.value));
const reviews = computed(() => asArray(product.value?.reviews ?? []));
const isLoggedIn = computed(() => Boolean(auth.token));

const useFallbackImage = (event) => {
  event.target.src = fallbackProductImage;
};

onMounted(async () => {
  try {
    const res = await getProduct(route.params.id);
    product.value = asObject(res, "product");
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load product.";
  } finally {
    loading.value = false;
  }
});

const addToCart = async () => {
  if (!isLoggedIn.value) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }

  await cart.add(product.value.id, quantity.value);
  actionMessage.value = "Added to cart.";
};

const buyNow = async () => {
  if (!isLoggedIn.value) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }

  await cart.add(product.value.id, quantity.value);
  router.push({ name: "checkout" });
};

const addToWishlist = async () => {
  if (!isLoggedIn.value) {
    router.push({ name: "login", query: { redirect: route.fullPath } });
    return;
  }

  await wishlist.add(product.value.id);
  actionMessage.value = "Added to wishlist.";
};
</script>

<template>
  <section class="container">
    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="product" class="detail-layout">
      <img :src="imageUrl" :alt="product.name" class="detail-image" @error="useFallbackImage" />

      <div class="detail-copy">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <strong class="price">${{ product.price }}</strong>

        <label>
          Quantity
          <input v-model.number="quantity" type="number" min="1" />
        </label>

        <div class="button-row">
          <button class="button" type="button" @click="buyNow">Buy now</button>
          <button class="button secondary" type="button" @click="addToCart">Add to cart</button>
          <button class="button secondary" type="button" @click="addToWishlist">Wishlist</button>
        </div>

        <p v-if="!isLoggedIn" class="auth-note">
          Login or register to add products to your cart and wishlist.
        </p>
        <p v-if="actionMessage" class="success">{{ actionMessage }}</p>
      </div>
    </div>

    <section v-if="reviews.length" class="section-block">
      <h2>Reviews</h2>
      <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
    </section>
  </section>
</template>
