"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsController_1 = require("../controllers/itemsController");
const router = (0, express_1.Router)();
router.get("/api/items", itemsController_1.getSearchResults);
router.get("/api/items/:id", itemsController_1.getItemDetail);
exports.default = router;
