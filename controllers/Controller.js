/**
 * Contendrá toda la funcionalidad.
 */

//Modelo
/* const uuid = require("uuid");
const blogs = require("../models/blog"); */

class Controller {
  constructor(modelo, vistas) {
    this.modelo = modelo;
    this.vistas = vistas;
    console.log(modelo);
  }

  // render utiliza el motor de renderizado que hemos registrado.
  async index(req, res) {
    try {
      const documents = await this.modelo.find();
      this.vistas.readAll.data.documents = documents;
      res.render(this.vistas.readAll.name, this.vistas.readAll.data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * express.urlencoded({extended:false}) permite acceder al req.body
   * para los formularios enviados en JSON
   */
  async create(req, res) {
    try {
      console.log("Formulario recibido...", req.body);
      const newDocument = new this.modelo(req.body);
      const documento = await newDocument.save();
      res.redirect("/"); // un redireccionamiento a la ruta
    } catch (error) {
      console.log("No puedo guardar el documento ", error);
    }
  }

  formCreate(req, res) {
    res.render(this.vistas.create.name, this.vistas.create.data);
  }

  async detalle(req, res) {
    //const blog = blogs.find(blog => blog.id == req.params.id);
    try {
      const documento = await this.find(res, req.params.id);
      if (documento) {
        this.vistas.readOne.data.documento = documento;
        res.render(this.vistas.readOne.name, this.vistas.readOne.data);
      }
    } catch (error) {
      res.render("404", {
        title: "Error no encontrado",
        mensajeError: "UPS, no encontrado",
      });
      console.log("No encuentro", error);
    }
  }

  async update(req, res) {
    try {
      const document = await this.find(res, req.params.id);
      this.vistas.update.data.document=document;
      res.render(this.vistas.update.name, this.vistas.update.data);
    } catch (error) {
      res.render("404", {
        title: "Error update",
        mensajeError: "UPS, no he podido actualizar",
      });
    }
  }

  async edit(req, res) {
    try {
      console.log(req.body);
      let document = await this.find(res, req.body.id);
      await document.updateOne(req.body);
      res.redirect("/");
    } catch (error) {
      res.render("404", {
        title: "Error update",
        mensajeError: "UPS, no he podido actualizar",
      });
    }
  }

  async delete(req, res) {
    try {
      console.log("intento borrar ", req.body);
      const document = await this.find(res, req.params.id);
      await document.delete();
      res.json({ redirect: "/" });
    } catch (error) {
      res.render("404", {
        title: "Error delete",
        mensajeError: "UPS, no he podido borrar",
      });
    }
  }

  async find(res, id) {
    try {
      const documento = await this.modelo.findById(id);
      return documento;
    } catch (error) {
      res.render("404", {
        title: "No encontrado",
        mensajeError: "No encontrado",
      });
    }
  }
}

module.exports = Controller;
