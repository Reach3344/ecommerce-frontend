<script setup>
import { computed, onMounted, ref } from "vue";
import { getProducts } from "@/api/catalog";
import ProductCard from "@/components/ProductCard.vue";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import { asArray } from "@/utils/apiResponse";

const products = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const selectedType = ref("all");

const productCount = computed(() => products.value.length);
const productTypes = computed(() => {
  const types = products.value
    .map((product) => getProductType(product))
    .filter(Boolean);

  return [...new Set(types)].sort((a, b) => a.localeCompare(b));
});
const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const type = selectedType.value;

  return products.value.filter((product) => {
    const productType = getProductType(product);
    const matchesType = type === "all" || productType === type;
    const searchableText = [
      product.name,
      product.description,
      productType,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesType && (!query || searchableText.includes(query));
  });
});

const getProductType = (product) =>
  product.category?.name ??
  product.category ??
  product.type?.name ??
  product.type ??
  product.product_type ??
  "Fresh produce";

const loadPublicProducts = async () => {
  const res = await getProducts();
  products.value = asArray(res, "products");
};

onMounted(async () => {
  try {
    await loadPublicProducts();
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load data.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="store-hero">
    <div class="hero-copy">
      <p class="eyebrow">Same-day fresh produce</p>
      <h1>Fresh fruit, picked for your basket.</h1>
      <p class="hero-text">
        Browse market-fresh fruit and everyday produce with clear prices, quick checkout, and delivery straight to your door.
      </p>

      <div class="hero-actions">
        <a class="button hero-button" href="#products">Start shopping</a>
        <router-link class="button secondary hero-button" to="/cart">View cart</router-link>
      </div>

      <div class="hero-metrics" aria-label="Store benefits">
        <div>
          <strong>30 min</strong>
          <span>local dispatch</span>
        </div>
        <div>
          <strong>4.8/5</strong>
          <span>buyer rating</span>
        </div>
        <div>
          <strong>{{ productCount || "Fresh" }}</strong>
          <span>products today</span>
        </div>
      </div>
    </div>

    <div class="hero-media">
      <img src="@/assets/fruits.png" alt="Fresh fruit selection" />
      <div class="hero-offer">
        <span>Today only</span>
        <strong>Free delivery over $15</strong>
      </div>
    </div>
  </section>

  <section class="store-strip" aria-label="Shopping benefits">
    <div>
      <b>Market fresh</b>
      <span>Stock checked every morning</span>
    </div>
    <div>
      <b>Secure checkout</b>
      <span>Protected customer account</span>
    </div>
    <div>
      <b>Easy reorder</b>
      <span>Cart, wishlist, and order history</span>
    </div>
  </section>

  <section id="products" class="container product-section">
    <div class="page-heading product-heading">
      <div>
        <p class="eyebrow">Featured produce</p>
        <h1>Shop fresh arrivals</h1>
      </div>
      <p>Search by product name or filter by type to quickly find what you need today.</p>
    </div>

    <div class="product-search" role="search">
      <label>
        Search products
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search mango, apple, tomato..."
          autocomplete="off"
        />
      </label>

      <label>
        Product type
        <select v-model="selectedType">
          <option value="all">All types</option>
          <option v-for="type in productTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </label>
    </div>

    <LoadingSpinner v-if="loading" />
    <p v-else-if="error" class="alert">{{ error }}</p>

    <div v-else-if="filteredProducts.length" class="product-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <p v-else-if="products.length" class="empty-state">
      No products match your search. Try another name or product type.
    </p>

    <p v-else class="empty-state">No products are available yet.</p>
  </section>
</template>
