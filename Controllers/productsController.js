const { connection } = require("../config/db");
const SuccessResponse = require("../utils/SuccessResponse");
const ErrorJson = require("../utils/ErrorJson");

const getProducts = (req, res, next) => {
  const npp = req.query.npp || 30;
  const page = req.query.page || 1;

  const q = `select * from products order by id desc limit ${npp} offset ${
    (page - 1) * npp
  };`;

  connection.query(q, (err, results) => {
    if (err) return next(err);
    return res.status(200).json(new SuccessResponse({ data: results }));
  });
};

const createProduct = (req, res, next) => {};

const getProductById = (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorJson("not authorized", 401));

  const q = "select * from products where id = " + id;
  connection.query(q, (err, results) => {
    if (err) return next(err);
    const product = results[0];
    if (!product) return next(new ErrorJson("product not found", 404));
    return res.status(200).json(new SuccessResponse({ data: product }));
  });
};

const latestProducts = (req, res, next) => {
  const q = `SELECT * FROM products order BY id DESC limit 3;`;
  connection.query(q, (err, results) => {
    if (err) return next(err);
    return res.status(200).json(new SuccessResponse({ data: results }));
  });
};

const getProductImg = (req, res, next) => {
  const { id } = req.params;
  connection.query(
    `select * from product_images where product_id = ${id}`,
    (err, results) => {
      if (err) return next(err);
      return res.json({ image: results[0] });
    }
  );
};
module.exports = {
  getProducts,
  getProductById,
  latestProducts,
  createProduct,
  getProductImg,
};
