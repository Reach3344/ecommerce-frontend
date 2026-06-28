<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { getProfile, updateProfile } from "@/api/profile";
import { useAuthStore } from "@/stores/auth";
import { asObject } from "@/utils/apiResponse";

const auth = useAuthStore();
const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
const imageFields = [
  "avatar_url",
  "avatar",
  "profile_image_url",
  "profile_image",
  "image_url",
  "image",
  "photo_url",
  "photo",
];
const uploadImageFields = ["image", "avatar", "profile_image", "photo"];

const form = ref({
  name: "",
  email: "",
});
const selectedImage = ref(null);
const previewUrl = ref("");
const currentUser = ref(null);
const loading = ref(true);
const saving = ref(false);
const message = ref("");
const error = ref("");

const initials = computed(() => {
  const name = form.value.name.trim();

  if (!name) {
    return "P";
  }

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
});

const resolveImageUrl = (user) => {
  const value = imageFields
    .map((field) => user?.[field])
    .find((fieldValue) => typeof fieldValue === "string" && fieldValue.trim().length)
    ?.trim();

  if (!value) {
    return "";
  }

  if (/^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${apiOrigin}${value}`;
  }

  if (value.startsWith("storage/") || value.startsWith("uploads/")) {
    return `${apiOrigin}/${value}`;
  }

  return `${apiOrigin}/storage/${value}`;
};

const profileImage = computed(() => previewUrl.value || resolveImageUrl(currentUser.value));

onMounted(async () => {
  try {
    const res = await getProfile();
    const user = asObject(res, "user");
    form.value.name = user.name ?? "";
    form.value.email = user.email ?? "";
    currentUser.value = user;
    auth.setUser(user);
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to load profile.";
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});

const selectImage = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    error.value = "Please choose an image file.";
    event.target.value = "";
    return;
  }

  error.value = "";
  message.value = "";
  selectedImage.value = file;

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }

  previewUrl.value = URL.createObjectURL(file);
};

const submit = async () => {
  message.value = "";
  error.value = "";
  saving.value = true;

  try {
    const payload = selectedImage.value ? new FormData() : { ...form.value };

    if (selectedImage.value) {
      payload.append("name", form.value.name);
      payload.append("email", form.value.email);
      uploadImageFields.forEach((field) => {
        payload.append(field, selectedImage.value);
      });
    }

    const res = await updateProfile(payload);
    const user = asObject(res, "user");
    currentUser.value = user;
    selectedImage.value = null;
    if (previewUrl.value && resolveImageUrl(user)) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = "";
    }
    auth.setUser(user);
    message.value = "Profile updated.";
  } catch (err) {
    error.value = err.response?.data?.message ?? "Unable to update profile.";
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <section class="profile-page">
    <form class="profile-panel" @submit.prevent="submit">
      <div class="profile-header">
        <div>
          <p class="eyebrow">Account</p>
          <h1>Profile</h1>
          <p>Update your FreshMart account details and profile image.</p>
        </div>
      </div>

      <p v-if="loading" class="auth-note">Loading profile...</p>
      <p v-if="error" class="alert">{{ error }}</p>
      <p v-if="message" class="success">{{ message }}</p>

      <div class="profile-layout">
        <aside class="profile-photo-panel">
          <div class="profile-avatar">
            <img v-if="profileImage" :src="profileImage" :alt="`${form.name || 'Profile'} photo`" />
            <span v-else>{{ initials }}</span>
          </div>

          <label class="button secondary profile-upload-button">
            Change image
            <input type="file" accept="image/*" :disabled="loading || saving" @change="selectImage" />
          </label>
        </aside>

        <div class="profile-fields">
          <label>
            Name
            <input v-model="form.name" :disabled="loading || saving" required />
          </label>

          <label>
            Email
            <input v-model="form.email" type="email" :disabled="loading || saving" required />
          </label>

          <button class="button profile-save-button" type="submit" :disabled="loading || saving">
            {{ saving ? "Saving..." : "Save changes" }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>
