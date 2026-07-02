<script setup>
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { getProducts } from "@/api/catalog";
import ProductCard from "@/components/ProductCard.vue";

const auth = useAuthStore();
const isLoggedIn = computed(() => Boolean(auth.token));
const featuredProducts = ref([]);
const loadingProducts = ref(false);

const fetchFeaturedProducts = async () => {
  try {
    loadingProducts.value = true;
    const response = await getProducts({ limit: 4 });
    if (Array.isArray(response.data)) {
      featuredProducts.value = response.data.slice(0, 4);
    } else if (response.data?.data) {
      featuredProducts.value = Array.isArray(response.data.data) ? response.data.data.slice(0, 4) : [];
    }
  } catch (err) {
    console.error("Error fetching featured products:", err);
  } finally {
    loadingProducts.value = false;
  }
};

onMounted(() => {
  fetchFeaturedProducts();
});
</script>

<template>
  <!-- Hero Section -->
  <section class="store-hero">
    <div class="hero-content">
      <p class="eyebrow">🌱 100% Organic & Local</p>
      <h1>Fresh Produce<br><span class="highlight">Delivered to Your Door</span></h1>
      <p class="hero-text">
        Skip the grocery store. Get farm-fresh organic produce delivered in 2 hours. Direct from local farmers to your kitchen.
      </p>

      <div class="hero-actions">
        <router-link class="button primary-button" :to="isLoggedIn ? '/cart' : '/register'">
          <span>🛒 Shop Now</span>
        </router-link>
        <router-link class="button secondary-button" to="/products">
          <span>Browse Products</span>
        </router-link>
      </div>

      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">2H</span>
          <span class="stat-label">Delivery</span>
        </div>
        <div class="stat">
          <span class="stat-number">50k+</span>
          <span class="stat-label">Happy Customers</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Organic</span>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="hero-image-wrapper">
        <img src="@/assets/fruits.png" alt="Fresh fruit basket" class="hero-image" />
        <div class="badge-discount">20% OFF</div>
        <div class="badge-new">FIRST ORDER</div>
      </div>
    </div>
  </section>

  <!-- Featured Products Section -->
  <section v-if="!loadingProducts && featuredProducts.length > 0" class="featured-products">
    <div class="container">
      <div class="section-header">
        <h2>Featured This Week</h2>
        <router-link to="/products" class="view-all">View All Products →</router-link>
      </div>
      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section id="features" class="benefits-section">
    <div class="container">
      <h2 class="section-title">Why Choose FreshMart?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🌾</div>
          <h3>Farm Direct</h3>
          <p>Source directly from local farmers within 100 miles. No middlemen, maximum freshness.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">✓</div>
          <h3>Quality Guaranteed</h3>
          <p>Every item hand-inspected by our team. If it's not perfect, it doesn't ship.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⚡</div>
          <h3>Super Fast</h3>
          <p>2-hour delivery window. Order before 11am, receive by 1pm the same day.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">♻️</div>
          <h3>Eco-Friendly</h3>
          <p>Sustainable packaging and carbon-neutral delivery. Good for you and the planet.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section id="steps" class="how-it-works">
    <div class="container">
      <div class="section-header">
        <h2>How It Works</h2>
        <p>Three simple steps to fresh produce at your door</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-icon">1</div>
          <h3>Browse & Order</h3>
          <p>Explore our seasonal selection and customize your box. Takes just 5 minutes.</p>
        </div>
        <div class="step-card">
          <div class="step-icon">2</div>
          <h3>We Pick & Pack</h3>
          <p>Fresh picked that morning and packed in our eco-friendly boxes within hours.</p>
        </div>
        <div class="step-card">
          <div class="step-icon">3</div>
          <h3>Fast Delivery</h3>
          <p>Receive your box within your 2-hour delivery window. Guaranteed freshness.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Social Proof Section -->
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <h2 class="section-title">Loved by Thousands</h2>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p>"The best produce I've ever tasted. My family switched completely from the grocery store."</p>
          <div class="testimonial-author">
            <strong>Sarah Johnson</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p>"The 2-hour delivery is a game changer. I literally schedule my cooking around it now!"</p>
          <div class="testimonial-author">
            <strong>Mike Chen</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p>"Finally, organic produce that doesn't cost a fortune. This is how shopping should be."</p>
          <div class="testimonial-author">
            <strong>Emma Davis</strong>
            <span>Verified Buyer</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-content">
      <h2>Get Fresh Produce Delivered Today</h2>
      <p>Join 50,000+ customers who've ditched the grocery store</p>
      <div class="cta-buttons">
        <router-link class="button primary-button" :to="isLoggedIn ? '/cart' : '/register'">Start Shopping</router-link>
        <router-link class="button secondary-button" to="/products">Browse Products</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
:global(:root) {
  --primary: #2ecc71;
  --primary-dark: #27ae60;
  --secondary: #3498db;
  --text-dark: #1a1a1a;
  --text-light: #666;
  --bg-light: #f8f9fa;
}

* {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.store-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
  min-height: 700px;
  padding: 120px 40px;
  overflow: hidden;
  background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
}

.store-hero::before {
  content: "";
  position: absolute;
  top: -30%;
  right: -10%;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(46, 204, 113, 0.15) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.eyebrow {
  margin-bottom: 20px;
  color: var(--primary);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.hero-content h1 {
  margin-bottom: 25px;
  color: var(--text-dark);
  font-size: 4.2rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0;
}

.highlight {
  display: block;
  color: var(--primary);
  background: linear-gradient(120deg, var(--primary) 0%, var(--primary-dark) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text {
  max-width: 500px;
  margin-bottom: 40px;
  color: var(--text-light);
  font-size: 1.15rem;
  line-height: 1.7;
}

.hero-actions,
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.hero-actions {
  margin-bottom: 40px;
}

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 14px 28px;
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  color: inherit;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
}

.button::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 -100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: left 0.3s ease;
}

.button:hover::before {
  left: 100%;
}

.button span {
  position: relative;
  z-index: 1;
}

.primary-button {
  color: #fff;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.35);
}

.primary-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(46, 204, 113, 0.45);
}

.secondary-button {
  border: 2px solid var(--primary);
  color: var(--primary);
  background: #fff;
}

.secondary-button:hover {
  color: var(--primary-dark);
  background: #f0f9f4;
  border-color: var(--primary-dark);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.2);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  color: var(--primary);
  font-size: 2rem;
  font-weight: 900;
}

.stat-label {
  color: var(--text-light);
  font-size: 0.95rem;
  font-weight: 600;
}

.hero-visual {
  position: relative;
  z-index: 1;
}

.hero-image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: min(100%, 560px);
  height: auto;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(46, 204, 113, 0.2), 0 0 60px rgba(46, 204, 113, 0.1);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.hero-image:hover {
  transform: scale(1.03) translateY(-8px);
  box-shadow: 0 40px 100px rgba(46, 204, 113, 0.25), 0 0 80px rgba(46, 204, 113, 0.15);
}

.badge-discount,
.badge-new {
  position: absolute;
  z-index: 2;
  padding: 12px 20px;
  border-radius: 999px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  animation: bounce 2s ease-in-out infinite;
}

.badge-discount {
  top: -15px;
  right: -15px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}

.badge-new {
  bottom: 30px;
  left: -20px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  animation-delay: 0.5s;
}

.featured-products,
.how-it-works {
  padding: 80px 40px;
  background: #fff;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 50px;
}

.section-header h2,
.section-title {
  color: var(--text-dark);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.section-title {
  margin-bottom: 60px;
  text-align: center;
}

.view-all {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.view-all:hover {
  color: var(--primary-dark);
  transform: translateX(5px);
}

.products-grid,
.benefits-grid,
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.benefits-section,
.testimonials-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%);
}

.benefit-card,
.step-card,
.testimonial-card {
  position: relative;
  padding: 40px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.benefit-card {
  overflow: hidden;
  border: 2px solid transparent;
  text-align: center;
}

.benefit-card::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}

.benefit-card:hover,
.step-card:hover,
.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(46, 204, 113, 0.14);
}

.benefit-card:hover {
  border-color: var(--primary);
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 72px;
  margin-bottom: 20px;
  padding: 0 14px;
  border-radius: 999px;
  color: var(--primary-dark);
  background: #eafaf1;
  font-size: 1rem;
  font-weight: 800;
}

.benefit-card h3,
.step-card h3 {
  margin-bottom: 15px;
  color: var(--text-dark);
  font-size: 1.25rem;
}

.benefit-card p,
.step-card p,
.testimonial-card p,
.how-it-works .section-header p {
  color: var(--text-light);
  line-height: 1.6;
}

.how-it-works .section-header {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
}

.step-card {
  padding: 30px;
  text-align: center;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  box-shadow: 0 12px 35px rgba(46, 204, 113, 0.35);
  font-size: 2.2rem;
  font-weight: 900;
  animation: pulse 2s ease-in-out infinite;
}

.testimonial-card {
  border-left: 4px solid var(--primary);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 15px;
  right: 20px;
  color: var(--primary);
  font-size: 3rem;
  opacity: 0.15;
}

.stars {
  margin-bottom: 20px;
  color: #ffc107;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.testimonial-card p {
  margin-bottom: 25px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.testimonial-author span {
  color: var(--text-light);
  font-size: 0.9rem;
}

.cta-section {
  position: relative;
  padding: 90px 40px;
  overflow: hidden;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  box-shadow: 0 20px 60px rgba(46, 204, 113, 0.3);
}

.cta-section::before,
.cta-section::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.cta-section::before {
  top: -50%;
  right: -20%;
}

.cta-section::after {
  bottom: -50%;
  left: -20%;
  animation-duration: 10s;
  animation-direction: reverse;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto;
}

.cta-content h2 {
  margin-bottom: 20px;
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
}

.cta-content p {
  margin-bottom: 40px;
  font-size: 1.15rem;
  opacity: 0.95;
}

.cta-buttons {
  justify-content: center;
}

.cta-section .primary-button {
  color: var(--primary);
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.cta-section .primary-button:hover {
  background: #f0f9f4;
}

.cta-section .secondary-button {
  color: #fff;
  background: transparent;
  border-color: #fff;
}

.cta-section .secondary-button:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  border-color: #fff;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 12px 35px rgba(46, 204, 113, 0.35);
  }

  50% {
    box-shadow: 0 12px 50px rgba(46, 204, 113, 0.5);
  }
}

@media (max-width: 1024px) {
  .store-hero {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 80px 40px;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .store-hero {
    min-height: auto;
    padding: 60px 20px;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-stats {
    gap: 20px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .section-header h2,
  .section-title {
    font-size: 2rem;
  }

  .benefits-grid,
  .products-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    gap: 30px;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .store-hero {
    padding: 40px 15px;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-text {
    font-size: 1rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    gap: 12px;
  }

  .button {
    padding: 14px 24px;
    font-size: 0.9rem;
  }

  .badge-discount,
  .badge-new {
    padding: 10px 16px;
    font-size: 0.75rem;
  }

  .section-title {
    margin-bottom: 40px;
    font-size: 1.6rem;
  }

  .benefit-card,
  .testimonial-card {
    padding: 25px 20px;
  }

  .cta-section {
    padding: 60px 20px;
  }

  .cta-content h2 {
    font-size: 1.6rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
