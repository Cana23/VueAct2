import { logService } from "./LogServices";
import { genericRequest } from "../utils/genericRequest";

const BASE_URL = "http://localhost:3000/users";

const handleError = async (error: any, context: string) => {
  const errorMessage = `Error during ${context}: ${error.message}`;
  console.error(errorMessage);

  const errorDetails = {
    response: error.response
      ? {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        }
      : null,
    request: error.request || null,
    message: error.message,
  };

  await logService.log("error", errorMessage, errorDetails);
  throw error;
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

export const UserServices = {
  async loginService(email: string, password: string) {
    try {
      const response = await genericRequest(`${BASE_URL}/login`, "POST", { email, password, headers });
      console.log("Respuesta del backend en loginService:", response);  // <-- Agrega esto
      return response;
    } catch (error) {
      await handleError(error, "login");
    }
},


  async registerService(email: string, password: string) {
    try {
      return await genericRequest(`${BASE_URL}/register`, "POST", {
        email,
        password,
        headers,
      });
    } catch (error) {
      await handleError(error, "login");
    }
  },

  async logoutService(token: string) {
    try {
      return await genericRequest(`${BASE_URL}/logout`, "POST", { token });
    } catch (error) {
      await handleError(error, "login");
    }
  },

  async getUserByIdService(id: number) {
    try {
      return await genericRequest(`${BASE_URL}/user/${id}`, "GET");
    } catch (error) {
      await handleError(error, "login");
    }
  },
};
