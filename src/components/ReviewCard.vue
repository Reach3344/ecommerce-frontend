<script setup>
defineProps({
  review: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="review-card">
    <strong>{{ review.user?.name ?? review.name ?? "Customer" }}</strong>
    <p>{{ review.comment ?? review.body }}</p>
    <small v-if="review.rating">Rating: {{ review.rating }}/5</small>
  </article>
</template>
