const mssql = require("mssql");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

const getCartItems = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const response = await pool.request().execute("getCartItems");
        const cartItems = await response.recordset;
        if (cartItems.length) {
          return res.status(200).json(cartItems);
        } else {
          res.status(404).json({ message: "No Items in cart" });
        }
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
};

const updateCartItems = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, discountRate, quantity, product_id } = req.body;
    
        const pool = await mssql.connect(sqlConfig);
        const item = await (
          await pool.request().input("id", mssql.VarChar, id).execute("getProduct")
        ).recordset;
        if (item.length) {
          await pool
            .request()
            .input("id", mssql.VarChar, id)
            .input("name", mssql.VarChar, name)
            .input("price", mssql.VarChar, price)
            .input("discountRate", mssql.VarChar, discountRate)
            .input("description", mssql.VarChar, description)
            .input("image", mssql.Image, image)
            .input("product_id", mssql.quantity, quantity)
            .input("product_id", mssql.product_id, product_id)
            .execute("uspCreateorUpdateCartItem");
          res.status(200).json({ message: "item successfully  Updated!!" });
        } else {
          res.status(404).json({ message: `the item ${id} is not found` });
        }
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}
const removeItemFromCart = async (req, res) =>{
    try {
        const { id } = req.params;
        const pool = await mssql.connect(sqlConfig);
        const item = await (
          await pool.request().input("id", id).execute("getCartItem")
        ).recordset;
    
        if (item.length) {
          await pool
            .request()
            .input("id", id)
            .execute("deleteCartItem");
          res.status(200).json({ message: "Item Deleted!!" });
        } else {
          res
            .status(404)
            .json({ message: `Item  with id ${id} does not exist` });
        }
      } catch (error) {
        res.status(404).json({ error: error.message });
}
}

const countCartItems = async (sessionID) => {
  const query = `select count(*) as count
                  from cartitem
                      join session using(customer_id)
                  where session_id=$1 and cart_item_status='added'`;
  const values = [sessionID];
  const out = await sqlConfig.execute("countItems", values);
  return out.rows[0].count - 0;
};

const addItemToCart = async (variantId, qty, sessionID) => {
  // const query = 'CALL addItemToCart($1, $2, $3)';
  // const values = [sessionID, variantId, qty];
  try {
    await sqlConfig.execute("addItemToCart");
  } catch (err) {
    return err;
  }
  return null;
};

module.exports = {
  getCartItems,
  removeItemFromCart,
  updateCartItems
//   addItemToCart,
//   editCartItemQuantity,
//   countCartItems,
};
