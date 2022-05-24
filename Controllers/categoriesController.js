const { connection } = require("../config/db");
const SuccessResponse = require("../utils/SuccessResponse");
const ErrorJson = require("../utils/ErrorJson");

const getCategories = (req, res, next) => {
  const q = `select * from genres order by id desc`;
  connection.query(q, (err, results) => {
    if (err) return next(err);
    return res.status(200).json(new SuccessResponse({ data: results }));
  });
};

const createCategory = (req, res, next) => {
  const { name } = req.body;
  const q = `INSERT INTO genres (name) VALUES ('${name}')`;
  connection.query(q, (err, results) => {
    if (err) return next(err);
    return res
      .status(200)
      .json(new SuccessResponse({ data: { name, id: results.insertId } }));
  });
};

const deleteCategory = (req, res, next) => {
  const { id } = req.params;
  const q = `delete from genres where id=${id}`;
  connection.query(q, (err, results) => {
    if (err) return next(err);
    return res.status(200).json(new SuccessResponse({ msg: "deleted" }));
  });
};

module.exports = { getCategories, createCategory, deleteCategory };
