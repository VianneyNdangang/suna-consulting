import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  /**
   * Initialise le thème depuis le localStorage
   */
  const initTheme = () => {
    if (!import.meta.client) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      // Utilise la préférence système lors de la première visite
      isDark.value = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    applyTheme();
  };

  /**
   * Applique le thème au document
   */
  const applyTheme = () => {
    if (!import.meta.client) return;

    document.documentElement.classList.toggle("dark", isDark.value);
  };

  /**
   * Change de thème
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value;

    if (import.meta.client) {
      localStorage.setItem(
        "theme",
        isDark.value ? "dark" : "light"
      );
    }

    applyTheme();
  };

  return {
    isDark,
    initTheme,
    applyTheme,
    toggleTheme,
  };
});