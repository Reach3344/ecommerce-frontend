<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { checkout } from "@/api/checkout";
import { useCartStore } from "@/stores/cart";
import { asObject } from "@/utils/apiResponse";
import { money } from "@/utils/money";

const router = useRouter();
const cart = useCartStore();
const form = ref({
  shipping_name: "",
  shipping_address: "",
  phone: "",
  payment_method: "cash_on_delivery",
});
const loading = ref(false);
const error = ref("");

onMounted(() => {
  cart.fetchCart();
});

const submit = async () => {
  error.value = "";
  loading.value = true;

  try {
    const payload = {
      ...form.value,
      shipping_phone: form.value.phone,
    };
    const res = await checkout(payload);
    const order = asObject(res, "order");

    await cart.fetchCart();

    if (order.id) {
      router.push({ name: "order-detail", params: { id: order.id } });
      return;
    }

    router.push({ name: "orders" });
  } catch (err) {
    const errors = err.response?.data?.errors;
    error.value = errors
      ? Object.values(errors).flat().join(" ")
      : err.response?.data?.message ?? "Checkout failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="checkout-page">
    <form class="form-panel checkout-form" @submit.prevent="submit">
      <h1>Checkout</h1>
      <p v-if="error" class="alert">{{ error }}</p>

      <label>
        Shipping name
        <input v-model="form.shipping_name" autocomplete="name" required />
      </label>

      <label>
        Shipping address
        <textarea v-model="form.shipping_address" required />
      </label>

      <label>
        Phone
        <input v-model="form.phone" autocomplete="tel" required />
      </label>

      <label>
        Payment method
        <select v-model="form.payment_method">
          <option value="cash_on_delivery">Cash on delivery</option>
          <option value="card">Card</option>
        </select>
      </label>

      <button class="button" type="submit" :disabled="loading">
        {{ loading ? "Placing order..." : "Place order" }}
      </button>
    </form>

    <aside class="order-summary">
      <h2>Order summary</h2>

      <div v-if="cart.items.length" class="summary-list">
        <div v-for="item in cart.items" :key="item.id" class="summary-row">
          <span>{{ item.product?.name ?? item.name }}</span>
          <strong>x{{ item.quantity ?? item.qty ?? 1 }}</strong>
        </div>
      </div>

      <p v-else class="muted">Your cart is loading or empty.</p>

      <div class="summary-total">
        <span>Total</span>
        <strong>${{ money(cart.total) }}</strong>
      </div>
    </aside>
  </section>
</template>
