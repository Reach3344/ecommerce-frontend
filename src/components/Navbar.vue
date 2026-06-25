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
        <router-link to="/wishlist">Wishlist</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/orders">Orders</router-link>
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
