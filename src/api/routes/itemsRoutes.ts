import { Router } from "express";
import {
  getSearchResults,
  getItemDetail,
} from "../controllers/itemsController";

const router = Router();

router.get("/api/items", getSearchResults);
router.get("/api/items/:id", getItemDetail);

export default router;
