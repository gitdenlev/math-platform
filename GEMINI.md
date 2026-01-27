# Nuxt.js/Vue.js Project Rules

## Tech Stack
- Framework: Nuxt 3 / Vue 3
- Language: TypeScript
- Styling: Tailwind CSS / UnoCSS
- State Management: Pinia (якщо потрібно)
- UI Components: shadcn-vue / PrimeVue / Vuetify (вказати свій)
- API: Nuxt Server API / useFetch

## Code Style & Structure

### Component Organization
- Використовуй `<script setup lang="ts">` для всіх компонентів
- Порядок блоків: `<script>`, `<template>`, `<style>`
- Один компонент = один файл
- Іменування компонентів: PascalCase (UserProfile.vue)
- Використовуй композицію та розбивай логіку на composables

### Script Section Order
```vue
<script setup lang="ts">
// 1. Імпорти сторонніх бібліотек
import { someLib } from 'library'

// 2. Імпорти типів (якщо потрібно явно)
import type { User } from '~/types'

// 3. Props & Emits
const props = defineProps<{
  user: User
  isActive?: boolean
}>()

const emit = defineEmits<{
  update: [value: string]
  close: []
}>()

// 4. Composables & Injections
const route = useRoute()
const { data, pending } = await useFetch('/api/users')

// 5. Reactive State
const count = ref(0)
const form = reactive({ name: '', email: '' })

// 6. Computed Properties
const fullName = computed(() => `${user.firstName} ${user.lastName}`)

// 7. Watchers
watch(() => props.user, (newUser) => {
  // logic
})

// 8. Functions & Methods
function handleSubmit() {
  // logic
}

// 9. Lifecycle Hooks
onMounted(() => {
  // initialization
})
</script>
```

### Template Guidelines
- Використовуй v-bind shorthand (`:prop` замість `v-bind:prop`)
- Використовуй v-on shorthand (`@click` замість `v-on:click`)
- Уникай складної логіки в темплейтах - виноси в computed
- Завжди використовуй `:key` в `v-for`
- Додавай `alt` до всіх зображень
- Використовуй семантичні HTML теги

### Naming Conventions
- Components: PascalCase (`UserProfile.vue`)
- Composables: camelCase з префіксом `use` (`useUserAuth.ts`)
- Utils/Helpers: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`User`, `ApiResponse`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Props in template: kebab-case (`:user-name="name"`)
- Events: kebab-case (`@update-user`)
- CSS classes: kebab-case або BEM

### TypeScript
- Завжди типізуй props, emits, composables
- Використовуй `type` для об'єктних типів замість `interface` (консистентність)
- Створюй типи в `/types` або поруч з компонентом
- Уникай `any` - використовуй `unknown` якщо тип невідомий
- Використовуй Generic типи де це доречно

## Nuxt-Specific Rules

### Directory Structure
```
├── assets/          # CSS, fonts, images (processed by build)
├── components/      # Auto-imported Vue components
├── composables/     # Auto-imported composables
├── layouts/         # Layout components
├── middleware/      # Route middleware
├── pages/           # File-based routing
├── plugins/         # Vue plugins
├── public/          # Static files (не обробляються)
├── server/          # Server-side code
│   ├── api/         # API endpoints
│   ├── middleware/  # Server middleware
│   └── utils/       # Server utilities
├── types/           # TypeScript definitions
└── utils/           # Helper functions
```

### Auto-imports
- НЕ імпортуй Vue Composition API (`ref`, `computed`, `watch`, тощо)
- НЕ імпортуй Nuxt composables (`useRoute`, `useFetch`, `navigateTo`)
- НЕ імпортуй компоненти з `components/`
- Composables в `composables/` експортуються з `use` префіксом

### Data Fetching
- Використовуй `useFetch` для API запитів на клієнті та сервері
- Використовуй `useAsyncData` для складної логіки
- Додавай `useLazyFetch` / `useLazyAsyncData` для некритичних даних
- Завжди обробляй `error` та `pending` стани
- Використовуй `key` для кешування запитів

```ts
const { data, pending, error, refresh } = await useFetch('/api/users', {
  key: 'users-list',
  lazy: false,
  server: true,
  transform: (data) => data.map(user => ({ ...user }))
})
```

### Server API Routes
- Файли в `server/api/` автоматично стають endpoints
- Використовуй typed event handlers з H3
- Повертай structured responses
- Обробляй помилки через `createError()`

```ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID is required'
    })
  }
  
  const user = await getUserById(id)
  return { user }
})
```

### State Management
- Для простого стану: composables з `ref`/`reactive`
- Для глобального стану: Pinia stores
- Stores в `stores/` з префіксом `use` (`useUserStore.ts`)

### SEO & Meta
- Використовуй `useHead` або `useSeoMeta` для meta тегів
- Налаштуй `app.head` в `nuxt.config.ts` для глобальних мета
- Додавай Open Graph та Twitter Card meta

## Performance Best Practices

### Component Optimization
- Lazy load компоненти: `const Modal = defineAsyncComponent(() => import('~/components/Modal.vue'))`
- Використовуй `v-show` для частих перемикань
- Використовуй `v-if` для умовного рендерингу
- Використовуй `v-memo` для великих списків
- Розбивай великі компоненти на менші

### Image Optimization
- Використовуй Nuxt Image модуль (`<NuxtImg>`, `<NuxtPicture>`)
- Завжди вказуй `width` та `height`
- Використовуй lazy loading: `loading="lazy"`
- Оптимізуй формати (WebP, AVIF)

### Bundle Size
- Динамічно імпортуй великі бібліотеки
- Використовуй tree-shaking
- Перевіряй bundle analyzer регулярно

## Error Handling

### Client-side
```ts
try {
  const { data } = await useFetch('/api/data')
} catch (error) {
  console.error('Failed to fetch:', error)
  // Handle error gracefully
}
```

### Server-side
```ts
throw createError({
  statusCode: 404,
  statusMessage: 'Resource not found',
  fatal: false
})
```

### Error Pages
- Створи `error.vue` в root для кастомної error page
- Використовуй `clearError()` для recovery

## Testing Considerations
- Компоненти мають бути testable (чиста логіка в composables)
- Props мають default values або type guards
- Уникай глобального стану де можливо

## Accessibility (A11y)
- Використовуй семантичні HTML теги
- Додавай ARIA labels де потрібно
- Підтримуй keyboard navigation
- Тестуй з screen readers
- Забезпеч достатній color contrast

## Security
- Уникай v-html (XSS ризик)
- Санітизуй user input
- Використовуй environment variables для secrets
- Валідуй дані на сервері

## Git & Code Review
- Осмислені commit messages (conventional commits)
- Малі, focused PRs
- Видаляй console.logs перед commit
- Перевіряй TypeScript errors перед push

## Comments & Documentation
- JSDoc для складних функцій
- Коментуй "чому", не "що"
- TODO коментарі з контекстом
- README з setup instructions

---

## When Generating Code:
1. Дотримуйся TypeScript strict mode
2. Використовуй Composition API з `<script setup>`
3. Пиши чистий, читабельний код
4. Додавай обробку помилок
5. Думай про performance з самого початку
6. Пиши accessible markup
7. Слідуй структурі проекту
8. Використовуй auto-imports Nuxt
9. Типізуй все що можливо
10. Пиши код готовий до production
