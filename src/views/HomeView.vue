<script setup>
import { computed, onMounted, ref } from "vue";
import { getProducts } from "@/api/catalog";
import ProductCard from "@/components/ProductCard.vue";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";
import { asArray } from "@/utils/apiResponse";
import { useAuthStore } from "@/stores/auth";
import { useWishlistStore } from "@/stores/wishlist";
import { productImageUrl } from "@/utils/productImage";

const products = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const selectedType = ref("all");
const auth = useAuthStore();
const wishlist = useWishlistStore();

const productCount = computed(() => products.value.length);
const productTypes = computed(() => {
  const types = products.value
    .map((product) => getProductType(product))
    .filter(Boolean);

  return [...new Set(types)].sort((a, b) => a.localeCompare(b));
});
const productCategories = computed(() => {
  const categories = new Map();

  products.value.forEach((product) => {
    const name = getProductType(product);
    if (!categories.has(name)) {
      categories.set(name, {
        name,
        image: productImageUrl(product),
        count: 0,
      });
    }

    categories.get(name).count += 1;
  });

  return Array.from(categories.values()).slice(0, 4);
});
const topWeeklyPicks = computed(() => products.value.slice(0, 4));
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

    if (auth.token) {
      await wishlist.fetchWishlist();
    }
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

  <section class="features-section container">
    <div class="feature-grid">
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10h12" />
            <path d="M5 6h10v12H5z" />
            <path d="M18 14v-4a2 2 0 0 0-2-2h-1" />
            <path d="M18 16h2v4h-2z" />
            <circle cx="7.5" cy="18.5" r="1.5" />
            <circle cx="17.5" cy="18.5" r="1.5" />
            <path d="M15 6h3" />
          </svg>
        </div>
        <strong>Same-Day Delivery</strong>
        <span>Order by noon and receive fresh groceries by dinner with fast, reliable shipping.</span>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C8 6 4 7 4 11a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-4-4-5-8-9z" />
            <path d="M12 12l-2 2 4 4" />
          </svg>
        </div>
        <strong>Organic Certified</strong>
        <span>All products are pesticide-free and non-GMO, curated from certified organic growers.</span>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11l9-7 9 7" />
            <path d="M4 11v8a2 2 0 0 0 2 2h3v-6h6v6h3a2 2 0 0 0 2-2v-8" />
            <path d="M9 22v-6h6v6" />
          </svg>
        </div>
        <strong>Direct from Farms</strong>
        <span>Cutting out middlemen means fresher produce and better prices for both farmers and customers.</span>
      </article>
    </div>
  </section>

  <section class="top-picks-section container">
    <div class="page-heading product-heading">
      <div>
        <p class="eyebrow">Top Weekly Picks</p>
        <h1>Fresh favorites for your basket</h1>
      </div>
      <p>Hand-picked seasonal products selected from our freshest arrivals.</p>
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="product in topWeeklyPicks"
        :key="product.id"
        :product="product"
      />
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
