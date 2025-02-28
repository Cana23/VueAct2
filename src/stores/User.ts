import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import { UserServices } from "../services/UserServices";
import { useRouter } from "vue-router";
import { logService } from "../services/LogServices";
import type { User } from "../interfaces/User";

export const useUserStore = defineStore("user", () => {
  const token = useStorage("token", "");
  const user = ref({} as User);
  const router = useRouter();


  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  const login = async (email: string, password: string) => {
    try {
      const response = await UserServices.loginService(email, password);
      if (response.status === 200) {
        token.value = response.token;
        user.value = response;
        router.push("/");
      }
    } catch (error: any) {
      const errorMessage = "Error al ingresar:";
      console.error(errorMessage, error);
      await logService.log("error", errorMessage, { error, email });
    }
  };

  const register = async (email: string, password: string) => {
    try {
      return await UserServices.registerService(email, password);
    } catch (error: any) {
      const errorMessage = "Error en registrar usuario:";
      console.error(errorMessage, error);
      await logService.log("error", errorMessage, { error, email });
    }
  };

  const logout = async () => {
    try {
      await UserServices.logoutService(token.value);
    } catch (error: any) {
      const errorMessage = "Error al cerrar sesion:";
      console.error(errorMessage, error);
      await logService.log("error", errorMessage, { error });
    } finally {
      token.value = "";
      user.value = {} as User;
      router.push("/login");
    }
  };

  return { token, user, isLoggedIn, login, register, logout };
});
