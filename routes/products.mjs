import express from "express";
import { products } from "../db/mock-product.mjs";
import { success,getUniqueId } from "./helper.mjs";
import {Product} from "../db/sequelize.mjs";
import {ValidationError} from "sequelize";


const productsRouter = express();
/*
productsRouter.get("/", (req, res) => {
    const message = "La liste des produits a bien été récupérée.";
    res.json(success(message, products));
});

productsRouter.get("/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find((product) => product.id == productId);
    const message = `Le produit dont l'id vaut ${productId} a bien été récupéré.`;
    res.json(success(message, product));
});

productsRouter.post("/", (req, res) => {
// Création d'un nouvel id du produit
// Dans les prochains versions, c'est MySQL qui gérera cela pour nous (identifiant auto_increment)
    const id = getUniqueId(products);
// Création d'un objet avec les nouvelles informations du produits
    const createdProduct = { ...req.body, ...{ id: id, created: new Date() } };
// Ajout du nouveau produit dans le tableau
    products.push(createdProduct);
// Définir un message pour le consommateur de l'API REST
    const message = `Le produit ${createdProduct.name} a bien été créé !`;
// Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, createdProduct));
});

productsRouter.delete("/:id", (req, res) => {
    const productId = req.params.id;
    let deletedProduct = getProduct(productId);
    removeProduct(productId);
// Définir un message pour le consommateur de l'API REST
    const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
// Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, deletedProduct));
});

productsRouter.put("/:id", (req, res) => {
    const productId = req.params.id;
    const product = getProduct(productId);
// Mise à jour du produit
// A noter que la propriété 'created' n'étant pas modifiée, sera conservée telle quelle.
    const updatedProduct = {
        id: productId,
        ...req.body,
        created: product.created,
    };
    updateProduct(productId, updatedProduct);
// Définir un message pour l'utilisateur de l'API REST
    const message = `Le produit ${updatedProduct.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
// Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, updatedProduct));
});
*/

productsRouter.get("/", (req, res) => {
    Product.findAll()
        .then((products) => {
            const message = "La liste des produits a bien été récupérée.";
            res.json(success(message, products));
        })
        .catch((error) => {
            const message = "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});

productsRouter.get("/:id", (req, res) => {
    Product.findByPk(req.params.id)
        .then((product) => {
            if (product === null) {
                const message =
                    "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
// A noter ici le return pour interrompre l'exécution du code
                return res.status(404).json({ message });
            }
            const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
            res.json(success(message, product));
        })
        .catch((error) => {
            const message =
                "Le produit n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});


productsRouter.post("/", (req, res) => {
    Product.create(req.body)
        .then((createdProduct) => {
// Définir un message pour le consommateur de l'API REST
            const message = `Le produit ${createdProduct.name} a bien été créé !`;
// Retourner la réponse HTTP en json avec le msg et le produit créé
            res.json(success(message, createdProduct));
        })
        .catch((error) => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message =
                "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});


productsRouter.delete("/:id", (req, res) => {
    Product.findByPk(req.params.id)
        .then((deletedProduct) => {
if (deletedProduct === null) {
    const message =
    "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
// A noter ici le return pour interrompre l'exécution du code
                return res.status(404).json({ message });
            }
                return Product.destroy({
                where: { id: deletedProduct.id },
            }).then((_) => {
// Définir un message pour le consommateur de l'API REST
    const message =
    `Le produit ${deletedProduct.name} a bien été supprimé !`;
// Retourner la réponse HTTP en json avec le msg et le produit créé
                res.json(success(message, deletedProduct));
            });
        })
        .catch((error) => {
    const message =
    "Le produit n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
        });
});


productsRouter.put("/:id", (req, res) => {
            const productId = req.params.id;
    Product.update(req.body, { where: { id: productId } })
            .then((_) => {
        Product.findByPk(productId)
                .then((updatedProduct) => {
if (updatedProduct === null) {
    const message =
    "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
// A noter ici le return pour interrompre l'exécution du code
                return res.status(404).json({ message });
                    }
// Définir un message pour l'utilisateur de l'API REST
    const message =
    `Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec succès`

// Retourner la réponse HTTP en json avec le msg et le produit créé
            res.json(success(message, updatedProduct));
})
        .catch((error) => {
    const message =
    "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
    });
})
        .catch((error) => {
    const message =
    "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
    });
});




export { productsRouter };