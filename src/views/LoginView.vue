<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

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

      <router-link to="/register">Create an account</router-link>
    </form>
  </section>
</template>
