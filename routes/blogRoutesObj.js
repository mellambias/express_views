const express = require("express");
const router = express.Router();

//Modelo
const Blog = require("../models/Blog");
//Controladores
const BlogController = require("../controllers/Controller");
// CRUD Create Read Update Delete
const Vistas = {
  readAll: { name: "index", data: { title: "inicio" }, model: "blogs" },
  readOne: { name: "blog", data: { title: "Post" }, model: "blog" },
  create: { name: "create", data: { title: "Crear entrada" }, model: "blog" },
  update: { name: "edit", data: { title: "Modificar Blog" }, model: "post" },
  delete: { name: "", data: { title: "" } },
};
const blogCtr = new BlogController(Blog, Vistas);

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
router.delete("/delete/:id", (res, req) => blogCtr.delete(res, req));
// detalles de un post
router.get("/:id", (res, req) => blogCtr.detalle(res, req));


module.exports = router;
