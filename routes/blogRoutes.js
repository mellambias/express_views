/* const express = require("express");
const router = express.Router();

//Modelo
const blogs = require("../models/blog");
//Controladores
//const blogControllers = require("../controllers/blogController");

/**
 * Rutas para el blog
 */

router.get("/", blogControllers.blockIndex);
router.get("/:id", blogControllers.blogDetalle);

// Crear nuevo post
router.get("/create", blogControllers.blogFormCreate);
router.post("/"
    ,express.urlencoded({ extended: false })
    , blogControllers.blogCreate 
);

// Editar post
router.get("/update/:id", blogControllers.blogUpdate);
router.post("/:id"
    ,express.urlencoded({ extended: false })
    ,blogControllers.blogEdit
);

// Borrar post
router.delete("/:id", blogControllers.blogDelete);


module.exports = router; */