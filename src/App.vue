<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Navbar />
  <main class="app-main">
    <router-view />
  </main>
  <Footer />
</template>
