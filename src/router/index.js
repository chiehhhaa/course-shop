import { createRouter, createWebHistory } from "vue-router";
import CourseList from "../components/CourseList.vue";
import Cart from "../components/Cart.vue";

const routes = [
  { path: "/", component: CourseList },
  { path: "/cart", component: Cart },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
