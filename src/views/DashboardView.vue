<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'


//Componentes
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'

//Ataques
const componentsMap = {
  XSS: defineAsyncComponent(() => import('../components/Attacks/XSSComponent.vue')),
  // SQL: defineAsyncComponent(() => import('../components/Attacks/SQLComponent.vue')),
  // CSRF: defineAsyncComponent(() => import('../components/Attacks/CSRFComponent.vue')),
  // JWT: defineAsyncComponent(() => import('../components/Attacks/JWTComponent.vue')),
  // HTTPS: defineAsyncComponent(() => import('../components/Attacks/HTTPSComponent.vue')),
}

const activeSection = ref('XSS')
const headerHeight = ref(0)

// Función para obtener la altura del header
const updateHeaderHeight = () => {
  const header = document.querySelector('header')
  if (header) {
    headerHeight.value = header.offsetHeight
  }
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    activeSection.value = sectionId
    const offset = headerHeight.value
    const elementPosition = section.offsetTop
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const handleScroll = () => {
  const sections = Object.keys(componentsMap)
  const offset = headerHeight.value + 20 // Agregamos un pequeño margen

  for (const sectionId of sections) {
    const section = document.getElementById(sectionId)
    if (section) {
      const position = section.getBoundingClientRect()
      if (position.top <= offset && position.bottom >= offset) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

// Debounce function para optimizar scroller
const debounce = (fn: Function, ms = 100) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const debouncedScroll = debounce(handleScroll)
const attacks = Object.keys(componentsMap)

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('scroll', debouncedScroll)
  window.addEventListener('resize', updateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll)
  window.removeEventListener('resize', updateHeaderHeight)
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    
    <!-- Header fijo -->
    <HeaderComponent>
      <template #lista>
        <nav class="overflow-x-auto">
          <ul class="flex space-x-2 md:space-x-4 px-4 whitespace-nowrap">
            <li v-for="section in attacks" :key="section">
              <button
                @click="scrollToSection(section)"
                :class="[
                  'py-2 px-3 rounded transition-colors text-sm md:text-base',
                  activeSection == section
                    ? 'text-blue-600 font-bold bg-primary'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50',
                ]"
              >
                {{ section }}
              </button>
            </li>
          </ul>
        </nav>
      </template>
    </HeaderComponent>

    <!-- Contenido principal -->
    <main :style="{ paddingTop: `${headerHeight}px` }" class="flex-grow">
      <div class="container mx-auto px-4 py-4">
        <component
          v-for="section in attacks"
          :id="section"
          :key="section"
          :is="componentsMap[section]"
          class="component-wrapper mb-12 p-4 md:p-6 rounded-lg shadow-sm bg-white transition-all duration-300 hover:shadow-md"
        >
        </component>
      </div>
    </main>

    <!-- Pie de página -->
    <FooterComponent />
  </div>
</template>

<style scoped>
.component-wrapper {
  min-height: calc(100vh - var(--header-height, 64px));
  border: 1px solid var(--color-primary);
}

/* Estilos para el scroll horizontal en dispositivos móviles */
nav {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Media queries para responsividad */
@media (max-width: 640px) {
  .component-wrapper {
    margin-bottom: 0.5rem;
    padding: 0.75rem;
  }
}
</style>