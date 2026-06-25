<script setup>
import { ref } from "vue";
import { register } from "@/api/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const loading = ref(false);
const error = ref("");

const submit = async () => {
  error.value = "";
  loading.value = true;

  try {
    await register(form.value);
    router.push({ name: "login" });
  } catch (err) {
    error.value = err.response?.data?.message ?? "Registration failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="auth-page">
    <form class="form-panel" @submit.prevent="submit">
      <h1>Register</h1>
      <p v-if="error" class="alert">{{ error }}</p>

      <label>
        Name
        <input v-model="form.name" autocomplete="name" required />
      </label>

      <label>
        Email
        <input v-model="form.email" type="email" autocomplete="email" required />
      </label>

      <label>
        Password
        <input v-model="form.password" type="password" autocomplete="new-password" required />
      </label>

      <label>
        Confirm Password
        <input v-model="form.password_confirmation" type="password" autocomplete="new-password" required />
      </label>

      <button class="button" type="submit" :disabled="loading">
        {{ loading ? "Creating..." : "Register" }}
      </button>
    </form>
  </section>
</template>
