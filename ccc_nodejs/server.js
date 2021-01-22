let express = require("express");
const fileUpload = require('express-fileupload');
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
const morgan = require("morgan");
// Settings
let port = process.env.PORT || 3000; //puerto donde correrá

app.use(cors());
// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );

// app.use(fileUpload({ useTempFiles: true }));

// Middlewares
app.use(morgan("dev"));
//app.use('/usuarios', Users);
app.use(express.json());

//ROUTES--------------------------------------------------------------

app.use("/api/clientes", require("./routes/Clientes"));
app.use("/api/empresa", require("./routes/Empresas"));
app.use("/api/productos", require("./routes/Productos"));
app.use("/api/donacion_productos", require("./routes/Donacion_Productos"));
app.use("/api/ventas_productos", require("./routes/Ventas_Productos"));
app.use("/api/upload", require("./routes/Upload"));

// Start listening
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
