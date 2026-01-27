<template>
  <!-- Mobile Overlay -->
  <div
    v-if="isMobile && isOpen"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    @click="closeSidebar"
  ></div>

  <!-- Mobile Toggle Button -->
  <button
    v-if="isMobile && !isOpen"
    @click="openSidebar"
    class="flex items-center justify-center fixed top-3 left-3 z-50 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
  >
    <Icon name="ph:sidebar-simple" size="24" />
  </button>

  <aside
    class="flex flex-col h-screen bg-zinc-50 dark:bg-[#121212] transition-all duration-300 ease-in-out relative z-50 text-[14px] font-sans border-r border-zinc-200 dark:border-zinc-800 group/sidebar"
    :class="[
      isMobile
        ? 'fixed inset-y-0 left-0 w-[250px] shadow-2xl'
        : isCollapsed
          ? 'w-[68px] shrink-0'
          : 'w-[260px] shrink-0',
      isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0',
    ]"
  >
    <!-- Top Bar: Sidebar Toggle & New Chat -->
    <div
      class="p-3 flex items-center h-[60px]"
      :class="isCollapsed && !isMobile ? 'justify-center' : 'justify-between'"
    >
      <!-- Collapse Button (Desktop) -->
      <button
        v-if="!isMobile"
        @click="toggleCollapse"
        class="flex items-center justify-center p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 transition-all duration-300 z-[60]"
        :class="[
          isCollapsed
            ? 'bg-zinc-200/50 dark:bg-zinc-800/50 opacity-100 relative'
            : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 opacity-100 relative',
        ]"
        :title="isCollapsed ? 'Відкрити меню' : 'Закрити меню'"
      >
        <Icon
          :name="
            isCollapsed ? 'ph:sidebar-simple-duotone' : 'ph:sidebar-simple'
          "
          size="20"
        />
      </button>
    </div>

    <!-- Main Navigation Area -->
    <div
      class="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide transition-opacity duration-200"
      :class="
        isCollapsed && !isMobile
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      "
    >
      <!-- Primary Actions -->
      <div class="space-y-1 mb-6">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-700 dark:text-zinc-300"
        >
          <Icon class="mb-0.5" name="mdi:brain-freeze" size="20" />
          <span class="font-medium text-sm">Новий розрахунок</span>
        </NuxtLink>

        <!-- New Space Button -->
        <button
          @click="showCreateSpaceModal = true"
          class="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-700 dark:text-zinc-300"
        >
          <Icon name="ph:cube" size="20" />
          <span class="font-medium text-sm">Новий простір</span>
        </button>

        <!-- Spaces List -->
        <div class="flex flex-col gap-0.5 mt-2">
          <NuxtLink
            v-for="space in recentSpaces"
            :key="space.id"
            :to="`/spaces/${space.id}`"
            class="group relative flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-500 dark:text-zinc-400 text-sm pr-8"
            active-class="bg-zinc-200/50 dark:bg-zinc-800/50 !text-zinc-900 dark:!text-zinc-100"
          >
            <div class="flex items-center gap-3 overflow-hidden">
              <!-- Icon is mostly static but distinct -->
              <div class="min-w-[20px] flex justify-center">
                <div
                  v-if="!space.isPinned"
                  class="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500 transition-colors"
                ></div>
                <Icon
                  v-else
                  name="mynaui:pin"
                  size="15"
                  class="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <span class="truncate">{{ space.title }}</span>
            </div>

            <!-- Context Menu Button (Vertical Dots) -->
            <div
              class="absolute right-1 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
            >
              <Menu as="div" class="relative">
                <MenuButton
                  @click.prevent
                  class="p-1 rounded-md hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors outline-none"
                >
                  <Icon name="ph:dots-three-vertical-bold" size="14" />
                </MenuButton>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-1 z-50 focus:outline-none origin-top-right ring-1 ring-black/5"
                  >
                    <MenuItem v-slot="{ active }">
                      <button
                        @click.prevent="renameSpace(space)"
                        :class="[
                          active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
                          'group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors',
                        ]"
                      >
                        <Icon name="ph:pencil-simple" size="14" />
                        Перейменувати
                      </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <button
                        @click.prevent="handlePinSpace(space.id)"
                        :class="[
                          active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
                          'group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors',
                        ]"
                      >
                        <Icon
                          :name="
                            space.isPinned ? 'ph:push-pin-slash' : 'ph:push-pin'
                          "
                          size="14"
                        />
                        {{ space.isPinned ? "Відкріпити" : "Закріпити" }}
                      </button>
                    </MenuItem>

                    <div
                      class="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-1"
                    ></div>

                    <MenuItem v-slot="{ active }">
                      <button
                        @click.prevent="handleDeleteSpace(space.id)"
                        :class="[
                          active
                            ? 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400'
                            : 'text-red-600 dark:text-red-400',
                          'group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
                        ]"
                      >
                        <Icon name="ph:trash" size="14" />
                        Видалити
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>

            <!-- Fade effect for long text -->
            <div
              class="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-50 dark:from-[#121212] via-zinc-50 dark:via-[#121212] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity"
            ></div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom User Section -->
    <div
      class="p-3 border-t border-zinc-200 dark:border-zinc-800 transition-opacity duration-200"
      :class="
        isCollapsed && !isMobile
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      "
    >
      <!-- User Profile -->
      <!-- User Profile Dropdown -->
      <div v-if="user">
        <Menu as="div" class="relative">
          <MenuButton
            class="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors text-left group outline-none"
          >
            <!-- Avatar -->
            <img
              v-if="userAvatarUrl"
              :src="userAvatarUrl"
              alt="User Avatar"
              class="w-8 h-8 rounded-full shadow-sm object-cover shrink-0"
            />
            <div
              v-else
              class="w-8 h-8 rounded-full bg-[#f48a3c] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm"
            >
              {{ userInitials }}
            </div>

            <!-- Info -->
            <div class="flex flex-col min-w-0 flex-1">
              <span
                class="font-semibold text-zinc-800 dark:text-zinc-200 truncate text-[13px]"
              >
                {{ userName }}
              </span>
            </div>
          </MenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-1 z-50 focus:outline-none origin-bottom-left ring-1 ring-black/5"
            >
              <div class="px-1 py-1 space-y-0.5">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="openSettings('general')"
                    :class="[
                      active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
                      'group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors',
                    ]"
                  >
                    <Icon name="ph:gear" size="16" />
                    Налаштування
                  </button>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/docs"
                    :class="[
                      active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
                      'group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors',
                    ]"
                  >
                    <Icon name="ph:book-open" size="16" />
                    Документація
                  </NuxtLink>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <button
                    @click="toggleTheme"
                    :class="[
                      active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
                      'group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors',
                    ]"
                  >
                    <Icon
                      :name="colorMode.value === 'dark' ? 'ph:sun' : 'ph:moon'"
                      size="16"
                    />
                    {{
                      colorMode.value === "dark" ? "Світла тема" : "Темна тема"
                    }}
                  </button>
                </MenuItem>

                <div class="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2"></div>

                <MenuItem v-slot="{ active }">
                  <button
                    @click="handleLogout"
                    :class="[
                      active
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400'
                        : 'text-zinc-700 dark:text-zinc-300',
                      'group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors',
                    ]"
                  >
                    <Icon name="ph:sign-out" size="16" />
                    Вийти
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <div v-else>
        <NuxtLink
          to="/login"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-zinc-600 dark:text-zinc-400 group"
        >
          <div
            class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
          >
            <Icon name="ph:sign-in" size="18" />
          </div>
          <span class="font-medium text-sm">Увійти</span>
        </NuxtLink>
      </div>
    </div>
    <SettingsModal
      v-model="isSettingsOpen"
      :initial-tab="initialSettingsTab"
      @close="isSettingsOpen = false"
    />
    <CreateSpaceModal
      v-model="showCreateSpaceModal"
      @close="showCreateSpaceModal = false"
      @create="handleCreateSpace"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useSpacesStore } from "~/stores/spaces";
import SettingsModal from "./settings/SettingsModal.vue";
import CreateSpaceModal from "./spaces/CreateSpaceModal.vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const spacesStore = useSpacesStore();
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigateTo("/login");
};

const userInitials = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email;
  if (!name) return "U";
  return name.substring(0, 2).toUpperCase();
});

const userName = computed(
  () => user.value?.user_metadata?.full_name || user.value?.email || "Гість",
);
const userAvatarUrl = computed(() => {
  if (!user.value) return null;

  // Пріоритет 1: user_metadata
  const metadata = user.value.user_metadata;
  if (metadata?.avatar_url) return metadata.avatar_url;
  if (metadata?.picture) return metadata.picture;
  if (metadata?.avatar) return metadata.avatar;

  // Пріоритет 2: app_metadata (іноді Google зберігає тут)
  const appMetadata = user.value.app_metadata;
  if (appMetadata?.avatar_url) return appMetadata.avatar_url;
  if (appMetadata?.picture) return appMetadata.picture;

  // Пріоритет 3: identities
  const identities = user.value.identities;
  if (identities && Array.isArray(identities)) {
    for (const identity of identities) {
      const data = identity.identity_data;
      if (data?.avatar_url) return data.avatar_url;
      if (data?.picture) return data.picture;
      if (data?.photo) return data.photo;
    }
  }

  // Пріоритет 4: прямо з user об'єкта
  if (user.value.picture) return user.value.picture;
  if (user.value.avatar_url) return user.value.avatar_url;

  return null;
});

// State
const isOpen = ref(false); // Mobile
const isCollapsed = ref(false); // Desktop
const isMobile = ref(false);

const isSettingsOpen = ref(false);
const initialSettingsTab = ref("profile");

const openSettings = (tab: string = "profile") => {
  initialSettingsTab.value = tab;
  isSettingsOpen.value = true;
};

// Recent spaces (limit to 10, pinned first)
const recentSpaces = computed(() => {
  const allSpaces = [...spacesStore.spaces];
  return allSpaces
    .sort((a, b) => {
      // Pinned first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then by creation date (newest first) - assuming newer IDs are "larger" or we have createdAt.
      // Actually createdAt is better but spacesStore adds to end.
      // Let's rely on array order (insertion order) reversed or just stick to pinned sorting + existing order.
      return 0;
    })
    .slice(0, 15);
});

const handlePinSpace = (id: string) => {
  spacesStore.togglePinSpace(id);
};

const checkMobile = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768;
    if (isMobile.value) {
      isCollapsed.value = false;
    }
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const openSidebar = () => {
  isOpen.value = true;
};

const closeSidebar = () => {
  isOpen.value = false;
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const showCreateSpaceModal = ref(false);
const handleCreateSpace = (data: { title: string; description: string }) => {
  const id = spacesStore.addSpace(data.title, data.description);
  navigateTo(`/spaces/${id}`);
};

// Actions for Spaces
const handleDeleteSpace = (id: string) => {
  if (confirm("Ви впевнені, що хочете видалити цей простір?")) {
    spacesStore.removeSpace(id);
    if (useRoute().params.id === id) {
      navigateTo("/spaces");
    }
  }
};

const renameSpace = (space: any) => {
  const newName = prompt("Введіть нову назву простору:", space.title);
  if (newName && newName.trim()) {
    spacesStore.renameSpace(space.id, newName.trim());
  }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
