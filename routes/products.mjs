import express from "express";
import { products } from "../db/mock-product.mjs";
import { success } from "./helper.mjs";


const productsRouter = express();
/*productsRouter.get("/", (req, res) => {
    const message = "La liste des produits a bien été récupérée.";
    res.json(success(message, products));
});*/

productsRouter.get("/", (req, res) => {
    const message = `La liste des ${products.length} produits a bien été récupérée.`;
    res.json(success(message, products));
});

productsRouter.get("/filter", (req, res) => {
    const message = "Le compteurs des produits filtrés a bien été récupéré.";
    res.json(success(message, products.filter(x => x.price > 2.99)));
});

export { productsRouter };