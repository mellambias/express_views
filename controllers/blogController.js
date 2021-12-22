/**
 * Contendrá toda la funcionalidad.
 */

//Modelo
const uuid = require("uuid");
const blogs = require("../models/blog");

// render utiliza el motor de renderizado que hemos registrado.
const blockIndex = (req, res) => {
  res.render("index", { title: "inicio", blogs }); 
}; 

/**
 * express.urlencoded({extended:false}) permite acceder al req.body
 * para los formularios enviados en JSON
 */
const blogCreate = (req, res) => {
    console.log("Formulario recibido...", req.body);
    const newBlog = { id: uuid.v4(), ...req.body }; // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    blogs.push(newBlog);
    res.redirect("/blog"); // un redireccionamiento a la ruta
    //res.render("index", { title: "inicio", blogs });
}

const blogFormCreate = (req, res) => {
  res.render("create", { title: "Crear entrada" });
};

const blogDetalle = (req, res) => {
  //const blog = blogs.find(blog => blog.id == req.params.id);
  const blog = findBlog(res, req.params.id);
  if (blog) {
    res.render("blog", { title: "Blog", blog });
  }
};

const blogUpdate = (req, res) => {
  const blog = findBlog(res, req.params.id);
  if (blog) {
    res.render("edit", { title: "Modificar Blog", blog });
  }
};

const blogEdit = (req, res) => {
  console.log(req.body);
  let index = blogs.findIndex((blog) => blog.id == req.body.id);
  if (index) {
    blogs[index] = req.body;
    res.redirect("/");
  } else {
    res.render("404", {
      title: "Error update",
      mensajeError: "UPS, no he podido actualizar el blog",
    });
  }
};

const blogDelete = (req, res) => {
  // Eliminar el elemento del array
  let index = blogs.findIndex((blog) => blog.id == req.params.id);
  if (index != -1) {
    blogs.splice(index, 1);
    res.json({ redirect: "/" });
  } else {
    res.render("404", {
      title: "Error delete",
      mensajeError: "UPS, no he podido borrar el blog",
    });
  }
};

function findBlog(res, id) {
  const blog = blogs.find((blog) => blog.id == id);
  if (!blog) {
    res.render("404", {
      title: "Blog no encontrado",
      mensajeError: "Blog no encontrado",
    });
  }
  return blog;
}

module.exports = {
  blockIndex,
  blogCreate,
  blogDetalle,
  blogUpdate,
  blogEdit,
  blogDelete,
  blogFormCreate,
};