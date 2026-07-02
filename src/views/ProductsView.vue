<script setup>
import { ref, onMounted } from "vue";
import { getProducts } from "@/api/catalog";
import ProductCard from "@/components/ProductCard.vue";
import LoadingSpinner from "@/components/LaoadingSpinner.vue";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await getProducts();
    // Handle different response structures
    if (Array.isArray(response.data)) {
      products.value = response.data;
    } else if (response.data?.data) {
      products.value = Array.isArray(response.data.data) ? response.data.data : [];
    } else {
      products.value = [];
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    error.value = "Failed to load products. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="products-page">
    <div class="products-header container">
      <h1>All Products</h1>
      <p>Browse our complete selection of fresh, organic, locally-sourced produce</p>
    </div>

    <div class="container">
      <div v-if="loading" class="loading-container">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button class="button" @click="fetchProducts">Try Again</button>
      </div>

      <div v-else-if="products.length === 0" class="empty-state">
        <p>No products available at the moment.</p>
      </div>

      <div v-else class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

.products-header {
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin-bottom: 40px;
}

.products-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.products-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-message {
  text-align: center;
  padding: 40px 20px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
  margin: 40px 0;
}

.error-message button {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .products-header h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .products-header {
    padding: 30px 15px;
    margin-bottom: 30px;
  }

  .products-header h1 {
    font-size: 1.5rem;
  }

  .products-header p {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>
