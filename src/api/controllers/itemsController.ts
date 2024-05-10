import { Request, Response } from "express";
import { searchItems, getProduct } from "../services/itemsService";

export const getSearchResults = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const results = await searchItems(query);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error al obtener los resultados de búsqueda");
  }
};

export const getItemDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const itemDetail = await getProduct(id);
    res.json(itemDetail);
  } catch (error) {
    res.status(500).send("Error al obtener el detalle del producto");
  }
};
