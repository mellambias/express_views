const express = require("express");
const router = express.Router();

//Modelo
const blogs = require("../models/blog");
//COntroladores
const blogControllers = require("../controllers/blogController")

/**
 * Rutas para el blog
 */

router.get("/", blogControllers.blockIndex);
router.post("/"
    ,express.urlencoded({ extended: false })
    , blogControllers.blogCreate 
);
router.get("/create", blogControllers.blogFormCreate);
router.get("/:id", blogControllers.blogDetalle);
router.get("/update/:id", blogControllers.blogUpdate);
router.post("/:id"
    ,express.urlencoded({ extended: false })
    ,blogControllers.blogEdit
);
router.delete("/:id", blogControllers.blogDelete);


module.exports = router;