<script setup>
import { onMounted, ref } from "vue";
import { getProfile, updateProfile } from "@/api/profile";
import { useAuthStore } from "@/stores/auth";
import { asObject } from "@/utils/apiResponse";

const auth = useAuthStore();
const form = ref({
  name: "",
  email: "",
});
const loading = ref(true);
const saving = ref(false);
const message = ref("");
const error = ref("");

onMounted(async () => {
  try {
    const res = await getProfile();
    const user = asObject(res, "user");
    form.value.name = user.name ?? "";
    form.value.email = user.email ?? "";
    auth.setUser(user);
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load profile.";
  } finally {
    loading.value = false;
  }
});

const submit = async () => {
  message.value = "";
  error.value = "";
  saving.value = true;

  try {
    const res = await updateProfile(form.value);
    auth.setUser(asObject(res, "user"));
    message.value = "Profile updated.";
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to update profile.";
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <section class="auth-page">
    <form class="form-panel" @submit.prevent="submit">
      <h1>Profile</h1>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="alert">{{ error }}</p>
      <p v-if="message" class="success">{{ message }}</p>

      <label>
        Name
        <input v-model="form.name" :disabled="loading" required />
      </label>

      <label>
        Email
        <input v-model="form.email" type="email" :disabled="loading" required />
      </label>

      <button class="button" type="submit" :disabled="loading || saving">
        {{ saving ? "Saving..." : "Save" }}
      </button>
    </form>
  </section>
</template>
