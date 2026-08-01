import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("sidebar", () => {
  const isSidebar = ref(true);

  const initSidebar = () => {
    if (import.meta.client) {
      isSidebar.value = localStorage.getItem("sidebar") !== "close";
    }
  };

  const saveState = () => {
    if (import.meta.client) {
      localStorage.setItem(
        "sidebar",
        isSidebar.value ? "open" : "close"
      );
    }
  };

  const handleChange = () => {
    isSidebar.value = !isSidebar.value;
    saveState();
  };

  const handleClose = () => {
    isSidebar.value = false;
    saveState();
  };

  return {
    isSidebar,
    initSidebar,
    handleChange,
    handleClose,
  };
});