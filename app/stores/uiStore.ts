import { defineStore } from "pinia";
import { ref } from "vue";


export const useUiStore = defineStore("sidebar", () => {
  const isSidebar = ref(true);
    // isSidebar.value = (window.localStorage.getItem("sidebar") === "open")
  const handleChange = () => {
    // isSidebar.value === !isSidebar.value;

    // window.localStorage.setItem(
    //   "sidebar",
    //   isSidebar.value ? "open" : "close"
    // );
  };

  return {
    isSidebar,
    handleChange,
  };
});