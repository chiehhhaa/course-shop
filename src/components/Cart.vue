<template>
  <div class="w-full min-h-screen px-4 sm:px-6 md:px-14 py-7">
    <div class="w-full flex flex-col h-fit gap-4">
      <p class="text-blue-900 text-xl font-extrabold">我的購物車</p>
      <div class="flex flex-col p-4 font-semibold border rounded-sm">
        <div v-if="cart.length === 0" class="text-center text-gray-600">
          <p class="text-lg">目前沒有商品</p>
        </div>
        <div v-else>
          <div
            v-for="item in cart"
            :key="item.id"
            class="border p-2 flex justify-between items-center mb-4"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="item.selected"
                class="mr-4 h-4 w-4 cursor-pointer"
              />
              <img
                :src="item.imageUrl"
                alt="Course Thumbnail"
                class="w-14 h-20 object-cover mr-4"
              />
              <div>
                <h3 class="text-md font-bold">{{ item.name }}</h3>
                <p class="font-light text-sm text-gray-600 mt-2">
                  NT${{ item.price }}
                </p>
              </div>
            </div>
            <button
              @click="removeItem(item.id)"
              class="py-1 px-1 rounded hover:text-red-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500 hover:text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.707 4.293a1 1 0 0 1 0 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
            </button>
          </div>
          <div class="mt-4" v-if="cart.length > 0">
            <p class="text-lg font-bold text-right">
              總共：{{ totalAmount }} 元
            </p>
            <div class="mt-2 flex justify-between items-center">
              <button
                @click="selectAllItems"
                class="py-2 px-2 hover:text-gray-500"
              >
                {{ selectAllButtonText }}
              </button>
              <div class="flex">
                <button
                  @click="removeAllSelected"
                  class="px-2 hover:text-gray-500 mr-2"
                >
                  移除所選課程
                </button>
                <button
                  @click="confirmCart"
                  class="py-2 px-2 hover:text-gray-500"
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCart } from "../store/cart";

export default {
  setup() {
    const {
      cart,
      removeItem,
      removeAllSelected,
      confirmCart,
      getTotalAmount,
      selectAllItems,
      selectAll,
    } = useCart();

    const totalAmount = computed(() => getTotalAmount());

    const selectAllButtonText = computed(() =>
      selectAll.value ? "取消全選" : "全選",
    );

    return {
      cart,
      removeItem,
      removeAllSelected,
      confirmCart,
      totalAmount,
      selectAllItems,
      selectAllButtonText,
    };
  },
};
</script>
