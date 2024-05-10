"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.searchItems = void 0;
const axios_1 = __importDefault(require("axios"));
const author = {
    name: "Sebastian",
    lastname: "Mosquera",
};
const searchItems = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.mercadolibre.com/sites/MLA/search`, { params: { q: query, limit: 4 } });
        const { results } = response.data;
        // Obtener las categorías únicas de los resultados
        const categoryIds = results.map((item) => item.category_id);
        const uniqueCategoryIds = Array.from(new Set(categoryIds));
        // Obtener la información detallada de cada categoría
        const categories = yield Promise.all(uniqueCategoryIds.map((categoryId) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryResponse = yield axios_1.default.get(`https://api.mercadolibre.com/categories/${categoryId}`);
            return categoryResponse.data.name;
        })));
        // Mapear los resultados y construir el array de items
        const items = results.map((item) => ({
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
    }
    catch (error) {
        console.error("Error al buscar items:", error);
        throw error;
    }
});
exports.searchItems = searchItems;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemResponse = yield axios_1.default.get(`https://api.mercadolibre.com/items/${id}`);
        let description = "";
        try {
            const descriptionResponse = yield axios_1.default.get(`https://api.mercadolibre.com/items/${id}/description`);
            description = descriptionResponse.data.plain_text;
        }
        catch (descriptionError) {
            console.error("Error al obtener la descripción:", descriptionError);
        }
        // Obtener la categoría del producto
        const categoryResponse = yield axios_1.default.get(`https://api.mercadolibre.com/categories/${itemResponse.data.category_id}`);
        const category = categoryResponse.data.name;
        const result = {
            author,
            item: {
                id: itemResponse.data.id,
                title: itemResponse.data.title,
                price: {
                    currency: itemResponse.data.currency_id,
                    amount: Math.floor(itemResponse.data.price),
                    decimals: parseInt((itemResponse.data.price % 1).toFixed(2).substring(2), 10),
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
    }
    catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
});
exports.getProduct = getProduct;
