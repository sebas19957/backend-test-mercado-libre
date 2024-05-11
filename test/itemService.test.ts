import axios from "axios";

import { SearchResponse } from "../src/api/interfaces/itemInterface";
import { searchItems } from "../src/api/services/itemsService";

// Simular axios y sus métodos
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResults = [
  {
    id: "MLA1",
    title: "Producto 1",
    price: 1000,
    currency_id: "ARS",
    thumbnail: "http://example.com/img1.jpg",
    condition: "new",
    shipping: { free_shipping: true },
    category_id: "CAT1",
  },
];

const mockCategoryName = "Electrónica";

describe("searchItems", () => {
  beforeEach(() => {
    // Limpiar todas las instancias y llamadas a constructor y todos los métodos:
    mockedAxios.get.mockClear();
  });

  it("debería retornar un objeto con autor, categorías e items", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: mockResults },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: { name: mockCategoryName },
    });

    const expectedResponse: SearchResponse = {
      author: {
        name: "Sebastian",
        lastname: "Mosquera Valencia",
      },
      categories: [mockCategoryName],
      items: mockResults.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: parseInt((item.price % 1).toFixed(2).substring(2), 10),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };

    const result = await searchItems("query");

    // Verificar que las respuestas simuladas fueron llamadas
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.mercadolibre.com/sites/MLA/search`,
      { params: { q: "query", limit: 4 } }
    );

    // Verificar que el resultado es el esperado
    expect(result).toEqual(expectedResponse);
  });
});
