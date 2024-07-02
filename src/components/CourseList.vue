<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5 mx-auto max-w-screen-xl px-4"
  >
    <div
      v-for="course in courses"
      :key="course.id"
      class="course-item bg-white shadow-md overflow-hidden mb-4 flex flex-col w-full max-w-[280px] mx-auto"
    >
      <div class="relative h-60">
        <img
          :src="course.imageUrl"
          alt="Course Thumbnail"
          class="h-full w-full object-cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 text-white text-center py-2"
        >
          <p class="text-sm">{{ formatStatus(course.status) }}</p>
        </div>
      </div>
      <div class="p-4 flex flex-col justify-between flex-grow">
        <h3 class="text-md font-medium text-gray-800 mb-2">
          {{ course.name }}
        </h3>
        <div>
          <p class="text-gray-700 text-sm mb-2">單價: NT$ {{ course.price }}</p>
          <button
            @click="addToCart(course)"
            :disabled="course.status !== '已開始'"
            :class="{
              'text-sm w-full py-2 bg-gray-800 text-white rounded-md focus:outline-none': true,
              'opacity-50 cursor-not-allowed':
                course.status !== '已開始' || course.addedToCart,
            }"
          >
            {{
              course.addedToCart
                ? "已加入"
                : course.status === "已開始"
                  ? "加入購物車"
                  : "無法選購"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoursesUsingThenCatch } from "../api/api";
import { useCart } from "../store/cart";

export default {
  data() {
    return {
      courses: [],
    };
  },
  mounted() {
    getCoursesUsingThenCatch().then((data) => {
      this.courses = data
        .map((course) => ({ ...course, addedToCart: false }))
        .sort((a, b) => {
          const statusOrder = { 已開始: 1, 尚未開始: 2, 已結束: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
    });
  },
  methods: {
    formatStatus(status) {
      switch (status) {
        case "已開始":
          return "進行中";
        case "尚未開始":
          return "尚未開始";
        default:
          return "已結束";
      }
    },
    addToCart(course) {
      const { addItem } = useCart();
      addItem(course);
      course.addedToCart = true;
    },
  },
};
</script>
