<template>
  <div> 
    <AdminNavbar />
    <AdminSidebar />
    <div
      class="transition-all duration-300 ease-in-out"
      :class="[
        uiStore.isSidebar ? 'pl-0 md:pl-70 pt-22' : 'pl-0 md:pl-20 pt-22',
      ]"
    >
      <slot />
    </div>
    <ToastContainer />
   
  </div>
</template>
<script setup lang="ts">
const uiStore = useUiStore();
</script>
