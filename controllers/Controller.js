/**
 * Contendrá toda la funcionalidad.
 */

//Modelo
/* const uuid = require("uuid");
const blogs = require("../models/blog"); */

class Controller {
  constructor(uuid, modelo, vistas) {
    this.uuid = uuid;
    this.modelo = modelo;
    this.vistas = vistas;
  }

  // render utiliza el motor de renderizado que hemos registrado.
  index(req, res) {
    res.render(this.vistas.readAll, { title: "inicio", blogs: this.modelo });
  }

  /**
   * express.urlencoded({extended:false}) permite acceder al req.body
   * para los formularios enviados en JSON
   */
  create(req, res) {
    console.log("Formulario recibido...", req.body);
    const newBlog = { id: this.uuid.v4(), ...req.body }; // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    this.modelo.push(newBlog);
    res.redirect("/blog"); // un redireccionamiento a la ruta
    //res.render("index", { title: "inicio", blogs });
  }

  formCreate(req, res) {
    res.render(this.vistas.create, { title: "Crear entrada" });
  }

  detalle(req, res) {
    //const blog = blogs.find(blog => blog.id == req.params.id);
    const blog = this.find(res, req.params.id);
    if (blog) {
      res.render(this.vistas.readOne, { title: "Blog", blog });
    }
  }

  update(req, res) {
    const blog = this.find(res, req.params.id);
    if (blog) {
      res.render(this.vistas.update, { title: "Modificar Blog", blog });
    }
  }

  edit(req, res) {
    console.log(req.body);
    let index = this.modelo.findIndex((blog) => blog.id == req.body.id);
    if (index) {
      this.modelo[index] = req.body;
      res.redirect("/");
    } else {
      res.render("404", {
        title: "Error update",
        mensajeError: "UPS, no he podido actualizar",
      });
    }
  }

  delete(req, res) {
    // Eliminar el elemento del array
    let index = this.modelo.findIndex(
      (documento) => documento.id == req.params.id
    );
    if (index != -1) {
      this.modelo.splice(index, 1);
      res.json({ redirect: "/" });
    } else {
      res.render("404", {
        title: "Error delete",
        mensajeError: "UPS, no he podido borrar el blog",
      });
    }
  }

  find(res, id) {
    const documento = this.modelo.find((documento) => documento.id == id);
    if (!documento) {
      res.render("404", {
        title: "No encontrado",
        mensajeError: "No encontrado",
      });
    }
    return documento;
  }
}

module.exports = Controller;