import {Product, sequelize} from "../db/sequelize.mjs";
import {initDb} from "../db/sequelize.mjs";
sequelize
    .authenticate()
    .then((_) =>
        console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));
initDb();

import express from "express";
const app = express();
app.use(express.json());

const port = 3000;
app.get("/", (req, res) => {
    res.send("API REST of self service machine !");
});
app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});
import { productsRouter } from "../routes/products.mjs";
app.use("/api/products", productsRouter);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

// Si aucune route ne correspondant à l'URL demandée par le consommateur
app.use(({ res }) => {
    const message =
        "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});



