<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { googleAuthUrl } from "@/api/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});
const loading = ref(false);
const error = ref("");

const submit = async () => {
  error.value = "";
  loading.value = true;

  try {
    await auth.login(form.value);
    router.push(route.query.redirect?.toString() || "/");
  } catch (err) {
    error.value = err.response?.data?.message ?? "Login failed.";
  } finally {
    loading.value = false;
  }
};

const redirectToGoogle = () => {
  window.location.href = googleAuthUrl();
};
</script>

<template>
  <section class="auth-page">
    <form class="form-panel" @submit.prevent="submit">
      <h1>Login</h1>
      <p v-if="error" class="alert">{{ error }}</p>

      <label>
        Email
        <input v-model="form.email" type="email" autocomplete="email" required />
      </label>

      <label>
        Password
        <input v-model="form.password" type="password" autocomplete="current-password" required />
      </label>

      <button class="button" type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <button class="button google" type="button" @click="redirectToGoogle">
        <span class="google-icon" aria-hidden="true">
          <svg viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272.1v95.4h146.9c-6.4 34.6-25.7 63.9-54.8 83.5v69.2h88.7c52.1-48 82-118.7 82-197.7z"/>
            <path fill="#34A853" d="M272.1 544.3c73.4 0 135-24.5 180-66.4l-88.7-69.2c-24.7 16.6-56.4 26.4-91.4 26.4-70.4 0-130-47.6-151.3-111.6h-89.4v69.8c44.9 88.8 137.3 151 240.7 151z"/>
            <path fill="#FBBC05" d="M120.8 323.5c-10.5-31.3-10.5-64.9 0-96.2V157.5h-89.4c-39 77.8-39 168.4 0 246.2l89.4-69.8z"/>
            <path fill="#EA4335" d="M272.1 107.7c39.9 0 75.9 13.7 104.2 40.6l78.1-78.1C407.1 24.2 344.5 0 272.1 0 168.8 0 76.4 62.2 31.5 151l89.4 69.8c21.1-64 80.8-111.6 151.2-111.6z"/>
          </svg>
        </span>
        Continue with Google
      </button>

      <router-link to="/register">Create an account</router-link>
    </form>
  </section>
</template>
