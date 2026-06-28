<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const showLogoutConfirm = ref(false);

const isLoggedIn = computed(() => Boolean(auth.token));

const askLogout = () => {
  showLogoutConfirm.value = true;
};

const closeLogoutConfirm = () => {
  showLogoutConfirm.value = false;
};

const confirmLogout = async () => {
  showLogoutConfirm.value = false;
  await auth.logout();
  router.push({ name: "home" });
};
</script>

<template>
  <header class="site-header">
    <router-link class="brand" to="/">
      <span class="brand-mark" aria-hidden="true">F</span>
      <span>FreshMart</span>
    </router-link>

    <nav class="nav-links" aria-label="Primary navigation">
      <router-link to="/">Products</router-link>

      <template v-if="isLoggedIn">
        <router-link to="/wishlist">
          <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
          <span>Wishlist</span>
        </router-link>
        <router-link to="/cart">
          <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h15l-1.7 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.6L5 3H2" />
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
          </svg>
          <span>Cart</span>
        </router-link>
        <router-link to="/orders">
          <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-2-1.3V5a2 2 0 0 1 2-2Z" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
          <span>Orders</span>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </nav>

    <div v-if="isLoggedIn" class="nav-actions">
      <router-link class="profile-link" to="/profile">
        <span class="nav-action-icon" aria-hidden="true">P</span>
        <span>Profile</span>
      </router-link>
      <button class="logout-button" type="button" @click="askLogout">
        <span class="nav-action-icon" aria-hidden="true">L</span>
        <span>Logout</span>
      </button>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="showLogoutConfirm"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeLogoutConfirm"
    >
      <section class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="logout-title">
        <div class="confirm-icon" aria-hidden="true">!</div>
        <div>
          <h2 id="logout-title">Log out of FreshMart?</h2>
          <p>Your cart and wishlist will stay saved, but you will need to sign in again to checkout.</p>
        </div>

        <div class="confirm-actions">
          <button class="button secondary" type="button" @click="closeLogoutConfirm">
            Cancel
          </button>
          <button class="button danger" type="button" @click="confirmLogout">
            Logout
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
