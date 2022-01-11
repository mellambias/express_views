const express = require("express");
const { get } = require("express/lib/response");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const conect = require("./dbMongo");

const url = `mongodb+srv://${conect.user}:${conect.pas}@cluster0.zbjmh.mongodb.net/${conect.dbName}?retryWrites=true&w=majority`;

// Routers
//const blogRouters = require("./routes/blogRoutes");
const blogRouters = require("./routes/blogRoutesObj");

const PORT = process.env.PORT || 5000;

(async function main() {
  try {
    await mongoose.connect(url);
    console.log("conectado a Atlas");
    app
      .listen(PORT, () => console.log("Servidor activo"))
      .on("error", (err) =>
        console.log(`Lo siento pero no he podido montar el servidor `, err)
      );
  } catch (error) {
    console.log("No se pudo conectar, servidor detenido", error);
  }
})();

// Registrar el motor de plantillas
app.set("view engine", "ejs");
// la carpeta por defecto es views que se puede cambiar modificando la variable views.  app.set("views","misVistas")
// las plantillas ahora tendran como extension ejs.

//Middleware

function mifunction(req, res, next) {
  console.log("Estoy en una función");
  next();
}

function mifunction2(req, res, next) {
  console.log("Estoy en una función 2");
  next();
}

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// usa el middleware para establecer un directorio de recursos estáticos
app.use(express.static("public"));

/* app.use((req, res, next) => {
  console.log("Hay una petición...");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method :", req.method);
  next(); // pasa el control al siguiente middleware o handle de rutas
}); */

// Todas las rutas que comienzan con /blog usaran el blogRouters
app.use("/blog", blogRouters);

/*
Uso de varios middlewares
app.use(
  (req, res, next) => {
    console.log("Estoy en el segundo middleware");
    next();
  },
  mifunction,
  mifunction2
); */

// Rutas
app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "No encontrado",
    mensajeError: "OOPs, página no encontrada :)",
  });
});
