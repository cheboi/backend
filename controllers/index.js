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

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await (await exec("getProductById", { id })).recordset;
    if (product.length) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: `product with id ${id} does not exist` });
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
      res.status(404).json({ message: `the product ${id} is not found` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await (await exec("getProduct", { id })).recordset;

  if (product.length) {
    query(`DELETE FROM Product WHERE id ='${id}'`);
    res.status(200).json({ message: "Product Deleted!!" });
  } else {
    res.status(404).json({ message: `Product with id ${id} does not exist` });
  }
};

module.exports = {
  getProducts,
  insertProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};
