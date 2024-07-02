<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-end gap-4">
      <router-link to="/" class="text-white">課程列表</router-link>
      <router-link to="/cart" class="text-white">
        購物車 ({{ cartItemCount }})</router-link
      >
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useCart } from "../store/cart";

export default {
  setup() {
    const { cart } = useCart();
    const cartItemCount = computed(() => cart.value.length);
    return {
      cartItemCount,
    };
  },
};
</script>
