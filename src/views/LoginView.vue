<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form @submit.prevent="handleSubmitLogin">
          <div class="mb-4">
            <label class="block text-gray-700">Correo Electrónico</label>
            <input type="email" v-model="email" v-bind="emailAttrs" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" required />
            <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700">Contraseña</label>
            <input type="password" v-model="password" v-bind="passwordAttrs" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" required />
            <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Ingresar</button>
        </form>
        <p class="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?
          <router-link to="/register" class="text-blue-500 hover:underline">Regístrate</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../stores/User'
  import { useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: yup.object({
      email: yup.string().email('Correo incorrecto').required('El correo es requerido'),
      password: yup.string().required('La contraseña es requerida'),
    }),
  })
  
  const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: true })
  const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: true })
  
  const userStore = useUserStore()
  const handleSubmitLogin = handleSubmit(async (values) => {
    await userStore.login(values.email, values.password)
    router.push({ name: 'Home' })
})

  </script>