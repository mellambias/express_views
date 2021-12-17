const express = require("express");
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Servidor activo"));

const blogs = [
  {"title": "Primer blog", "resume": "Resumen del primer blog", "body":""},
  {"title": "Segundo blog", "resume": "Resumen del segundo blog", "body":""},
  {"title": "Tercer blog", "resume": "Resumen del tercero blog", "body":""},
];

//Registrar el motor
app.set("view engine", "ejs");
// la carpeta por defecto es views que se puede cambiar modificando la variable views => app.set("views","misVistas")
// las plantillas ahora tendran como extension ejs.

//Middleware

function mifunction (req,res,next) {
  console.log("Estoy en una función");
  next();
}

function mifunction2 (req,res,next) {
  console.log("Estoy en una función 2");
  next();
}
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// usa el middleware para establecer un directorio de recursos estáticos
app.use(express.static("public"));

app.use((req,res,next)=>{
  console.log("Hay una petición...");
  console.log('host: ', req.hostname);
  console.log('path: ',req.path);
  console.log('method :',req.method);
  next(); // pasa el control al siguiente middleware o handle de rutas 
})

app.use((req,res,next) =>{
  console.log("Estoy en el segundo middleware");
  next();
},mifunction,mifunction2)

// Rutas

app.get("/",(req, res) => {
  res.render("index", { title: "inicio", blogs }); // render utiliza el motor de renderizado que hemos registrado.
});

app.post("/",express.urlencoded({extended:false}),(req,res)=>{
  console.log("Formulario recibido...",req.body);
  blogs.push(req.body);
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