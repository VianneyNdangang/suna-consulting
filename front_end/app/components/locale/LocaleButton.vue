<script setup lang="ts">
const { locale, setLocale } = useI18n();
const locales = [
  {
    code: "fr",
    name: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    alt: "Français",
  },
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/w320/gb.png",
    alt: "English",
  },
] as const;

const selectedLocale = computed(
  () => locales.find((item) => item.code === locale.value) || locales[0]!,
);

const selectLocale = async (code: "fr" | "en") => {
  if (locale.value !== code) {
    await setLocale(code);
  }
};

const dropdownItems = locales.map((item) => ({
  label: item.name,
  slot: "locale",
  code: item.code,
  flag: item.flag,
  onSelect: () => selectLocale(item.code),
}));
</script>

<template>
  <UDropdownMenu :items="dropdownItems" :ui="{ content: 'min-w-32' }">
    <template #default>
      <button
        type="button"
        class="flex h-9 w-11 items-center justify-center"
        aria-label="Changer de langue"
      >
        <img
          :src="selectedLocale.flag"
          :alt="selectedLocale.alt"
          class="h-5 w-7 rounded-sm object-cover"
        />
      </button>
    </template>

    <template #locale="{ item }">
      <span class="flex items-center gap-2">
        <img
          :src="item.flag"
          :alt="item.label"
          class="h-5 w-7 rounded-sm object-cover"
        />
        <span>{{ item.label }}</span>
      </span>
    </template>
  </UDropdownMenu>
</template>
