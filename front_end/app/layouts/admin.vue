<template>
  <div class="min-h-screen bg-sand-50">

    <!-- Sidebar Desktop -->
    <AdminSidebar />

    <!-- Navbar -->
    <AdminNavbar />

    <!-- Contenu -->
    <main
      class="min-h-screen bg-(--bg) pt-25 px-5 pb-5 transition-all duration-300"
      :class="uiStore.isSidebar ? 'md:ml-72' : 'md:ml-20'"
    >
      <slot />
    </main>

    <!-- Toast -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
onMounted(() => {
  uiStore.initSidebar()
})
</script>