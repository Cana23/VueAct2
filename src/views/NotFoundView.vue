<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1>
          404. No existe la ruta <span class="font-bold text-red-500">{{ route.path }}</span>
        </h1>
        <h2>Regresando...</h2>
        <RouterLink :to="{ name: 'login' }">
          <button type="submit" class="border-2 border-amber-50 bg-slate-600 text-white p-3 px-4 rounded-2xl">Regresar ahora</button></RouterLink
        >
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  setTimeout(() => {
    router.push({ name: 'login' })
  }, 9000)
  </script>
  
  <style scoped></style>