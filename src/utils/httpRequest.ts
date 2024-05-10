import axios from "axios";

export const httpRequest = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Aquí puedes manejar el error como prefieras, por ejemplo, lanzando una excepción personalizada o devolviendo un valor por defecto.
    console.error("Error al realizar la petición HTTP:", error);
    throw error;
  }
};
