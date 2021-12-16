const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Servidor activo"));

//Registrar el motor
app.set("view engine", "ejs");
// la carpeta por defecto es views que se puede cambiar modificando la variable views => app.set("views","misVistas")
// las plantillas ahora tendran como extension ejs.

// Rutas

app.get("/", (req, res) => {
    const blogs = [
        {"title": "Primer blog", "resume": "Resumen del primer blog"},
        {"title": "Segundo blog", "resume": "Resumen del segundo blog"},
        {"title": "Tercer blog", "resume": "Resumen del tercero blog"},
    ];

  res.render("index", { title: "inicio", blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Crear entrada" });
});


app.use((req,res)=>{
    res.status(404)
    .render("404", { title: "No encontrado" });
});