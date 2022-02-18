//requerir express y rutas
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan")
const routes = require("./routes/index")

require('dotenv').config();

const { MONGO_URL, PORT } = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error(err);
  });

//middlewares y cors

app.use(express.json());
app.use(helmet()); 
app.use(morgan('dev'));
// app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//enviar todas las peticiones a las rutas server.use('/', routes)
app.use('/', routes)

//crear catching endware

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const msg = err.message || err;
    console.error(err);
    res.status(status).send(msg);
})

app.listen(PORT, ()=> {
    console.log("Server running on port 3001")
})

