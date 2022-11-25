const mssql = require("mssql");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

const getProducts = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("getProducts");
    const products = await response.recordset;
    if (products.length) {
      return res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No Products in the table" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const insertProduct = async (req, res) => {
  try {
    const id = v4();
    const { name, description, price, imageURL, discountRate } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("name", mssql.VarChar, name)
      .input("price", mssql.VarChar, price)
      .input("discountRate", mssql.VarChar, discountRate)
      .input("description", mssql.VarChar, description)
      .input("imageUrl", mssql.Image, imageURL)
      .execute("insertProduct");

    res.status(201).json({ message: "product added" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageURL, discountRate } = req.body;

    const pool = await mssql.connect(sqlConfig);
    const product = await (
      await pool.request().input("id", mssql.VarChar, id).execute("getProduct")
    ).recordset;
    if (product.length) {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("name", mssql.VarChar, name)
        .input("price", mssql.VarChar, price)
        .input("discountRate", mssql.VarChar, discountRate)
        .input("description", mssql.VarChar, description)
        .input("imageUrl", mssql.Image, imageURL)
        .execute("insertProduct");
      res.status(200).json({ message: "product successfully  Updated!!" });
    } else {
      res.status(404).json({ message: `thi product ${id} is not found` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  insertProduct,
  updateProduct,
};
