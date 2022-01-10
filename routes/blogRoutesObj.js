const express = require("express");
const router = express.Router();

//Modelo
const blogs = require("../models/Blog");
//Controladores
const uuid = require("uuid");
const BlogController = require("../controllers/Controller");
const vistas = {
    index: "index",
    detalle: "blog",
    create: "create",
    edit: "edit"
}
const blogCtr = new BlogController(uuid, blogs,vistas);

/**
 * Rutas para el blog
 */

router.get("/", (res, req) => blogCtr.index(res, req));


// Crear nuevo
router.post("/create", express.urlencoded({ extended: false }), (res, req) => {
  console.log("crear nuevo post");
  blogCtr.create(res, req);
});
  
router.get("/create", (res, req) => {
  blogCtr.formCreate(res, req);
});



// Editar post
router.get("/update/:id", (res, req) => blogCtr.update(res, req));
router.post("/:id", express.urlencoded({ extended: false }), (res, req) =>
  blogCtr.edit(res, req)
);

// Borrar post
router.delete("/:id", (res, req) => blogCtr.delete(res, req));
// detalles de un post
router.get("/:id", (res, req) => blogCtr.detalle(res, req));


module.exports = router;
