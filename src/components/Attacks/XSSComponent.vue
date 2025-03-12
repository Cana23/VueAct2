<template>
    <section
      class="mb-12 p-6 rounded-lg shadow-sm bg-base-100 transition-all duration-300 hover:shadow-md"
      style="min-height: 100vh"
    >
      <div id="XSS">
        <h2 class="text-2xl font-bold mb-4">Cross-Site Scripting (XSS)</h2>
        <p class="mb-4">
          XSS permite inyectar scripts maliciosos en páginas web vistas por otros usuarios.
        </p>
        <form @submit.prevent="submitXSS" class="mb-4">
          <label for="xssInput" class="block mb-2">Introduce un script:</label>
          <input
            autocomplete="false"
            id="xssInput"
            v-model="CommentUser"
            class="input border w-full mb-4"
          />
          <button type="submit" class="border bg-slate-500 text-white p-2 px-4 rounded-xl">Enviar</button>
        </form>
        <div v-html="Comment" class="prose mb-4"></div>
        <div>
          <h3 class="text-xl font-bold mb-2">Ejemplos básicos de XSS:</h3>
          <ul class="">
            <li v-for="comment, index in comment" :key="index" class="mb-2">
              <p v-html="comment"></p>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button @click="show = !show" type="submit" class="btn btn-primary my-4">Mostrar</button>
        </div>
        <div v-if="show">
          <h3 class="text-xl font-bold mb-2">Prevención de XSS:</h3>
          <p class="mb-2">
            Para prevenir XSS, es importante escapar correctamente los datos de entrada y utilizar
            métodos seguros para renderizar contenido HTML.
          </p>
          <ul class="list-disc list-inside">
            <li>Escapar caracteres especiales en el lado del servidor.</li>
            <li>Utilizar bibliotecas de sanitización de HTML.</li>
            <li>Implementar Content Security Policy (CSP).</li>
          </ul>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { reactive, type Reactive } from 'vue'
  import { onMounted } from 'vue'
  import { getCommentService, addCommentService } from '../../services/AttackService.ts'

  const comments:Ref<Comment[]> = ref([{ id: 1, user_id: 1, comment: 'Hola crayola' }])

  const CommentUser = ref('')
  const show = ref(false)

  const results = ref('')

  const submitComment = async () => {
    if (CommentUser.value) {
      const response = await addCommentService(1, CommentUser.value)
      if (response.message) {
        alert(response.message)
      }
    }
  }

  onMounted(async () => {
    console.log('onMounted ejecutado')
    const response = await getCommentService()
    if (response.results) {
      comments.value = response.results
    }else{
      comments.value = [{ id: 0, user_id: 0, comment: 'Perdiste, manito'}]
    }
  })
  
  
  </script>