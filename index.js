const express = require("express");
const fileupload = require("express-fileupload");
const { connection } = require("./config/db");
const dotenv = require("dotenv");
var cors = require("cors");

const errorHandler = require("./middlewares/error_handler");
const app = express();
dotenv.config();
app.use(cors());
app.use(fileupload());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { extname } = require("path");
const multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/products-images");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

app.post("/api/products/insert", (req, res, next) => {
  const newpath = __dirname + "/public/uploads/products-images/";

  const file = req.files.product_img;

  const filename = new Date().getTime().toString(36) + file.name;

  const data = {
    name: req.body.name,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
    genre_id: req.body.genre_id,
    img_name: filename,
  };
  const q = `INSERT INTO products (name , description , stock , price , genre_id , added_by ,img_name) VALUES ("${data.name}" , "${data.description}" , ${data.stock} , ${data.price} , ${data.genre_id} , 1 , "${data.img_name}")`;

  connection.query(q, (err, results) => {
    if (err) {
      return next(err);
    }

    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "File upload failed", code: 200 });
      }
      return res
        .status(200)
        .send({ message: "product is inserted", code: 200 });
    });
  });
});

// routes
app.use("/api/products", require("./routes/products"));
app.use("/api/genres", require("./routes/categories"));

// error handler
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running..."));
