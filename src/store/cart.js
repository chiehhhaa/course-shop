import { ref, watchEffect } from "vue";

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);
const selectAll = ref(false);

export const useCart = () => {
  const selectAllItems = () => {
    if (selectAll.value) {
      cart.value.forEach((item) => {
        item.selected = false;
      });
      selectAll.value = false;
    } else {
      cart.value.forEach((item) => {
        item.selected = true;
      });
      selectAll.value = true;
    }
  };

  const addItem = (item) => {
    const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      alert("該課程已在購物車中。");
      return;
    }

    if (item.status === "尚未開始") {
      alert("該課程尚未開始，不能加入購物車。");
      return;
    }

    cart.value.push({ ...item, selected: false });
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const removeItem = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const removeAllSelected = () => {
    cart.value = cart.value.filter((item) => !item.selected);
    localStorage.setItem("cart", JSON.stringify(cart.value));
    selectAll.value = false;
  };

  const confirmCart = () => {
    if (cart.value.length === 0) {
      alert("購物車是空的，請先加入商品。");
      return;
    }
    alert("購物車已確認");
  };

  const getTotalAmount = () => {
    return cart.value.reduce((total, item) => total + item.price, 0);
  };

  // 使用 watchEffect 自動監控 cart 的變化並更新 localStorage
  watchEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  });

  return {
    cart,
    addItem,
    removeItem,
    removeAllSelected,
    confirmCart,
    getTotalAmount,
    selectAllItems,
    selectAll,
  };
};
