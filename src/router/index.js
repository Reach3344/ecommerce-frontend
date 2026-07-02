import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import CartView from "@/views/CartView.vue";
import WishlistView from "@/views/WishlistView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import OrdersView from "@/views/OrdersView.vue";
import OrderDetailView from "@/views/OrderDetailView.vue";
import ProfileView from "@/views/ProfileView.vue";
import OAuthCallbackView from "@/views/OAuthCallbackView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
        path: "/", 
        name: "home",
        component: HomeView },
    { 
        path: "/login", 
        name: "login", 
        component: LoginView },
    { 
        path: "/register", 
        name: "register", 
        component: RegisterView },
    { 
        path: "/products/:id",
        name: "product-detail", 
        component: ProductDetailView },
    { path: "/cart", name: "cart", component: CartView, meta: { requiresAuth: true } },
    { path: "/wishlist", name: "wishlist", component: WishlistView, meta: { requiresAuth: true } },
    { path: "/checkout", name: "checkout", component: CheckoutView, meta: { requiresAuth: true } },
    { path: "/orders", name: "orders", component: OrdersView, meta: { requiresAuth: true } },
    { path: "/orders/:id", name: "order-detail", component: OrderDetailView, meta: { requiresAuth: true } },
    { path: "/profile", name: "profile", component: ProfileView, meta: { requiresAuth: true } },
    { path: "/auth/callback", name: "oauth-callback", component: OAuthCallbackView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if ((to.name === "login" || to.name === "register") && token) {
    return { name: "home" };
  }

  return true;
});

export default router;
