<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const isLoggedIn = computed(() => Boolean(auth.token));
</script>

<template>
  <section class="store-hero">
    <div class="hero-copy">
      <p class="eyebrow">100% Organic & Local</p>
      <h1>Freshness Harvested Just For You.</h1>
      <p class="hero-text">
        Experience agricultural modernism. We connect local farmers directly to your kitchen, delivering peak-season produce with precision of modern logistics.
      </p>

      <div class="hero-actions">
        <router-link class="button hero-button" :to="isLoggedIn ? '/cart' : '/register'">Get Started</router-link>
        <a class="button secondary hero-button" href="#features">Browse the Season</a>
      </div>

      <div class="hero-metrics" aria-label="Store benefits">
        <div>
          <strong>2-Hour</strong>
          <span>delivery window</span>
        </div>
        <div>
          <strong>50k+</strong>
          <span>home chefs</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>organic & local</span>
        </div>
      </div>
    </div>

    <div class="hero-media">
      <img src="@/assets/fruits.png" alt="Fresh fruit basket" />
      <div class="hero-offer">
        <span>2-Hour Delivery</span>
      </div>
    </div>
  </section>

  <section id="features" class="features-section container">
    <div class="feature-grid">
      <article class="feature-card feature-card-large">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 13.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4.5" />
            <path d="M10 11V6a2 2 0 0 1 4 0v5" />
            <path d="M5 10.5c.67 1 1.75 1.75 3 1.75s2.33-.75 3-1.75" />
          </svg>
        </div>
        <h2>Rooted in Sustainability</h2>
        <p>Our farmers use regenerative practices that give back to the soil. We minimize plastic waste and optimize delivery routes to reduce our carbon footprint.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C8 6 4 7 4 11a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-4-4-5-8-9z" />
            <path d="M12 12l-2 2 4 4" />
          </svg>
        </div>
        <h3>Strictly Local</h3>
        <p>We only source from farms within a 100-mile radius of your city. This means fewer miles, more flavor, and direct support for your local economy.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11l9-7 9 7" />
            <path d="M4 11v8a2 2 0 0 0 2 2h3v-6h6v6h3a2 2 0 0 0 2-2v-8" />
            <path d="M9 22v-6h6v6" />
          </svg>
        </div>
        <h3>Uncompromising Quality</h3>
        <p>Every item is hand-inspected by our quality team before it leaves the hub. If it’s not perfect, it doesn’t ship.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 13l3 3 5-5" />
            <path d="M5 20h14" />
          </svg>
        </div>
        <h3>Real-Time Freshness</h3>
        <p>Track your harvest from the moment it’s picked to the moment it arrives at your door with integrated farm-tracking technology.</p>
      </article>
    </div>
  </section>

  <section class="steps-section container">
    <div class="page-heading">
      <div>
        <p class="eyebrow">From farm to doorstep in 3 simple steps</p>
        <h1>Freshness, simplified.</h1>
      </div>
      <p>Our easy process brings you farm-fresh produce without the hassle of traditional grocery delivery.</p>
    </div>

    <div class="step-grid">
      <article class="step-card">
        <div class="step-number">1</div>
        <h2>Farmers Harvest</h2>
        <p>Our partner farmers pick produce at the peak of ripeness every morning, ensuring maximum nutrient density.</p>
      </article>
      <article class="step-card">
        <div class="step-number">2</div>
        <h2>We Curate</h2>
        <p>We sort and pack your personalized selection in eco-friendly, temperature-controlled containers within hours.</p>
      </article>
      <article class="step-card">
        <div class="step-number">3</div>
        <h2>You Enjoy</h2>
        <p>Your fresh bounty arrives at your door. No grocery lines, no middlemen—just pure nature.</p>
      </article>
    </div>
  </section>

  <section class="testimonial-section">
    <div class="testimonial-hero container">
      <span class="eyebrow">Trusted by 50,000+ Home Chefs</span>
      <h1>FreshMart helps every meal feel farm-to-table.</h1>
    </div>

    <div class="testimonial-grid container">
      <article class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p>“The quality of the greens is unlike anything I’ve found in high-end markets. You can literally taste the soil and the sunshine. FreshMart has completely changed how my family eats.”</p>
        <footer>
          <strong>Sarah Jenkins</strong>
          <span>Nutritionist & Mom</span>
        </footer>
      </article>
      <article class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p>“As a professional chef, I’m picky about my ingredients. FreshMart consistently delivers produce that meets my standards. Their transparency about sourcing is refreshing.”</p>
        <footer>
          <strong>Marcus Thorne</strong>
          <span>Executive Chef, The Green Room</span>
        </footer>
      </article>
    </div>
  </section>

  <section class="promo-section container">
    <div class="promo-card">
      <div>
        <h1>Ready to taste the difference?</h1>
        <p>Join the FreshMart community today and get 20% off your first farm-to-table box.</p>
      </div>
      <div class="promo-actions">
        <router-link class="button" to="/register">Join Now</router-link>
        <router-link class="button secondary" to="/login">View Pricing</router-link>
      </div>
    </div>
  </section>
</template>
