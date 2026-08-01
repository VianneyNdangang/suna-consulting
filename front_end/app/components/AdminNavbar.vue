<template>
  <nav
    class="fixed top-0 right-0 z-40
           flex h-20 items-center
           border-b border-(--border)
           bg-(--surface)
           px-6
           shadow-sm
           transition-all duration-300"
    :class="uiStore.isSidebar ? 'md:left-72' : 'md:left-20'"
  >
    <div class="flex w-full items-center justify-between">

      <!-- Left -->
      <div class="flex items-center gap-4">

        <!-- Mobile menu -->
        <button
          class="rounded-lg p-2 transition hover:bg-rust-600/10 md:hidden"
          @click="isMenu = true"
        >
          <IconMenu2
            :size="28"
            class="text-rust-600"
          />
        </button>

        <div>
          <h1 class="text-2xl font-bold text-rust-900">
            Bonjour,
            <span class="text-gold-400">
              {{ user?.username }}
            </span>
          </h1>

          <p class="text-sm text-ink-900/70">
            {{ user?.role }} Manager
          </p>
        </div>

      </div>

      <!-- Right -->
      <div class="flex items-center gap-3">

    <button class="hidden h-10 w-10 items-center justify-center rounded-xl
                 border border-rust-600/10
                 text-rust-600
                 transition
                 hover:bg-rust-600/10
                 md:flex">
        <IconSearch :size="20"/>
    </button>

    <button class="hidden h-10 w-10 items-center justify-center rounded-xl
                 border border-rust-600/10
                 text-rust-600
                 transition
                 hover:bg-rust-600/10
                 md:flex">
        <IconBellRinging :size="20"/>
    </button>

    <ThemeButton />

    <button class="hidden h-10 w-10 items-center justify-center rounded-xl
                 border border-rust-600/10
                 text-rust-600
                 transition
                 hover:bg-rust-600/10
                 md:flex"
            @click="isProfile = true">
        <Profile
            :src="user?.image"
            h="10"
        />
    </button>

</div>

    </div>
  </nav>

  

  <!-- Mobile Sidebar -->
  <Drawers
    :isOpen="isMenu"
    placement="start"
    @close="isMenu = false"
>
    <AdminSidebar mobile />
</Drawers>
</template>

<script setup lang="ts">
import {
  IconBellRinging,
  IconMenu2,
  IconSearch,
} from "@tabler/icons-vue"
import Drawers from "./drawers/Drawers.vue"

const store = useUserStore()


const uiStore = useUiStore()
const profileStore = useAuthStore()

const isMenu = ref(false)
const isProfile = ref(false)
const isUpdate = ref(false)

const { user } = storeToRefs(profileStore)

onMounted(async () => {
  await profileStore.fetchProfile()
})
</script>