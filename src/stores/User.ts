import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useStorage } from "@vueuse/core";
import { UserServices } from "../services/UserServices";
import { logService } from "../services/LogServices";
import type { User } from "../interfaces/User";

export const useUserStore = defineStore("user", () => {
  const token = useStorage("token", "");
  const user = ref({} as User);

  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined);

  watch(token, (newValue) => {
    console.log("Token ha cambiado, isLoggedIn se actualizará:", newValue);
  });

  async function login(email: string, password: string) {
    try {
      const response = await UserServices.loginService(email, password);
      if (response?.token) {
        console.log("Login exitoso, token recibido:", response.token);
        token.value = response.token;
        user.value = response;
      }
    } catch (error: any) {
      console.error("Error al ingresar:", error);
      await logService.log("error", "Error al ingresar", { error, email });
    }
  }

  async function register(email: string, password: string) {
    try {
      return await UserServices.registerService(email, password);
    } catch (error: any) {
      console.error("Error en registrar usuario:", error);
      await logService.log("error", "Error en registrar usuario", { error, email });
    }
  }

  async function logout() {
    try {
      await UserServices.logoutService(token.value);
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      await logService.log("error", "Error al cerrar sesión", { error });
    } finally {
      token.value = "";
      user.value = {} as User;
    }
  }

  return { token, user, isLoggedIn, login, register, logout };
});
