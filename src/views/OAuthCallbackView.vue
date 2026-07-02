<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import api from "@/api/axios";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || params.get("access_token") || route.query.token || route.query.access_token;

  if (!token) {
    error.value = "Google login failed: missing auth token.";
    loading.value = false;
    return;
  }

  auth.token = token;
  localStorage.setItem("token", token);

  try {
    const res = await api.get("/user");
    auth.user = res.data?.user ?? res.data?.data ?? res.data ?? null;
  } catch {
    if (params.get("user")) {
      try {
        auth.user = JSON.parse(params.get("user"));
      } catch {
        auth.user = null;
      }
    }
  } finally {
    loading.value = false;
    router.push(route.query.redirect?.toString() || "/");
  }
});
</script>

<template>
  <section class="auth-page">
    <div class="form-panel">
      <h1>Google Login</h1>
      <p v-if="error" class="alert">{{ error }}</p>
      <p v-else-if="loading">Please wait while we finish your Google sign in.</p>
    </div>
  </section>
</template>
