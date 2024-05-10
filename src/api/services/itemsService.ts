import axios from "axios";
import {
  Author,
  SearchResponse,
  ItemDetailResponse,
} from "../interfaces/itemInterface";

const author: Author = {
  name: "Sebastian",
  lastname: "Mosquera Valencia",
};

export const searchItems = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search`,
      { params: { q: query, limit: 4 } }
    );
    const { results } = response.data;

    // Obtener las categorías únicas de los resultados
    const categoryIds = results.map((item: any) => item.category_id);
    const uniqueCategoryIds = Array.from(new Set(categoryIds));

    // Obtener la información detallada de cada categoría
    const categories = await Promise.all(
      uniqueCategoryIds.map(async (categoryId) => {
        const categoryResponse = await axios.get(
          `https://api.mercadolibre.com/categories/${categoryId}`
        );
        return categoryResponse.data.name;
      })
    );

    // Mapear los resultados y construir el array de items
    const items = results.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: parseInt((item.price % 1).toFixed(2).substring(2)),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    // Formatear la respuesta incluyendo la información del autor
    return {
      author,
      categories,
      items,
    };
  } catch (error) {
    console.error("Error al buscar items:", error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<ItemDetailResponse> => {
  try {
    const itemResponse = await axios.get(
      `https://api.mercadolibre.com/items/${id}`
    );
    let description = "";
    try {
      const descriptionResponse = await axios.get(
        `https://api.mercadolibre.com/items/${id}/description`
      );
      description = descriptionResponse.data.plain_text;
    } catch (descriptionError) {
      console.error("Error al obtener la descripción:", descriptionError);
    }

    // Obtener la categoría del producto
    const categoryResponse = await axios.get(
      `https://api.mercadolibre.com/categories/${itemResponse.data.category_id}`
    );
    const category = categoryResponse.data.name;

    const result: ItemDetailResponse = {
      author,
      item: {
        id: itemResponse.data.id,
        title: itemResponse.data.title,
        price: {
          currency: itemResponse.data.currency_id,
          amount: Math.floor(itemResponse.data.price),
          decimals: parseInt(
            (itemResponse.data.price % 1).toFixed(2).substring(2),
            10
          ),
        },
        picture: itemResponse.data.pictures[0].url,
        condition: itemResponse.data.condition,
        free_shipping: itemResponse.data.shipping.free_shipping,
        sold_quantity: itemResponse.data.sold_quantity,
        description,
        category,
      },
    };
    return result;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};
