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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemDetail = exports.getSearchResults = void 0;
const itemsService_1 = require("../services/itemsService");
const getSearchResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const results = yield (0, itemsService_1.searchItems)(query);
        res.json(results);
    }
    catch (error) {
        res.status(500).send("Error al obtener los resultados de búsqueda");
    }
});
exports.getSearchResults = getSearchResults;
const getItemDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const itemDetail = yield (0, itemsService_1.getProduct)(id);
        res.json(itemDetail);
    }
    catch (error) {
        res.status(500).send("Error al obtener el detalle del producto");
    }
});
exports.getItemDetail = getItemDetail;
