<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 class="text-2xl font-bold text-center mb-6">Regístrate</h2>
            <form @submit.prevent="handleSubmitRegister">
                <div class="mb-4">
                    <label class="block text-gray-700">Correo Electrónico</label>
                    <input type="email" v-model="email" v-bind="emailAttrs"
                        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required />
                    <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700">Contraseña</label>
                    <input type="password" v-model="password" v-bind="passwordAttrs"
                        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required />
                    <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700">Confirmar Contraseña</label>
                    <input type="password" v-model="confirmPassword"
                        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required />
                    <span v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</span>
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Registrarse
                </button>
            </form>

            <p class="mt-4 text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-blue-500 hover:underline">Inicia sesión</router-link>
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
        password: yup
            .string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .matches(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula')
            .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
            .matches(/\d/, 'La contraseña debe incluir al menos un número')
            .matches(/[@$!%*?&]/, 'La contraseña debe incluir al menos un carácter especial (@$!%*?&)')
            .required('La contraseña es requerida'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('La confirmación de contraseña es requerida'),
    }),
})

const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: true })
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: true })
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', { validateOnModelUpdate: true })

const userStore = useUserStore()
const handleSubmitRegister = handleSubmit(async (values) => {
    await userStore.register(values.email, values.password).then(() => {
        router.push({ name: 'Home' })
    })
})
</script>