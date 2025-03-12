<template>
    <header class="header-bg shadow-md w-full z-10 top-0">
        <div class="container mx-auto px-4 py-2 flex justify-between text-white">
            <h1 class="font-bold text-2xl">Simulacion de ataques</h1>
            <nav class="flex">
                <ul class="list-none flex space-x-6">
                    <slot name="Lista" />
                </ul>
            </nav>
            <button v-if="userStore.isLoggedIn" @click="handleLogout"
                    class="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                    Cerrar Sesión
                </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/User'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
    userStore.logout()
    router.push('/login')
}
</script>