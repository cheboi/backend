const mssql = require("mssql");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

const getCartItems = async (sessionID) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("getCartItems");
    const cartItems = await response.recordset;
    let subtotal = 0;
    cartItems.rows.forEach((v) => {
      if (v.cart_item_status === "added") {
        v.totalprice = v.unitprice * v.quantity;
        subtotal += v.totalprice;
      } else {
        res.status(404).json({ message: "No Item add to in the table" });
      }
    });
    return {
      cartItems: out.rows,
      subtotal,
    };
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
//   const out = await sqlConfig.execute("getCart", [sessionID]);
//   let subtotal = 0;
//   out.rows.forEach((v) => {
//     if (v.cart_item_status === "added") {
//       // eslint-disable-next-line no-param-reassign
//       v.totalprice = v.unitprice * v.quantity;
//       subtotal += v.totalprice;
//     }
//   });
//   return {
//     cartItems: out.rows,
//     subtotal,
//   };
};

// const countCartItems = async (sessionID) => {
//   // const query = `select count(*) as count
//   //                 from cartitem
//   //                     join session using(customer_id)
//   //                 where session_id=$1 and cart_item_status='added'`;
//   const values = [sessionID];
//   const out = await sqlConfig.execute("countItems", values);
//   return out.rows[0].count - 0;
// };

// const addItemToCart = async (variantId, qty, sessionID) => {
//   // const query = 'CALL addItemToCart($1, $2, $3)';
//   // const values = [sessionID, variantId, qty];
//   try {
//     await sqlConfig.execute("addItemToCart");
//   } catch (err) {
//     return err;
//   }
//   return null;
// };

// const removeItemFromCart = async (sessionId, cartItemId) => {
//   // const query = 'CALL removeCartItem($1, $2)';
//   // const values = [sessionId, cartItemId];
//   await sqlConfig.execute("removeItemFromCart");
// };

// const editCartItemQuantity = async (sessionId, cartItemId, newQuantity) => {
//   // const query = 'CALL changeCartItemQuantity($1, $2, $3)';
//   // const values = [sessionId, cartItemId, newQuantity];
//   try {
//     await sqlConfig.execute("editCartItemQuantity");
//   } catch (err) {
//     return err;
//   }
//   return null;
// };

// const transferCartItem = async (sessionId, cartItemId) => {
//   const query = "CALL transferCartItem($1, $2)";
//   const values = [sessionId, cartItemId];
//   try {
//     await sqlConfig.query(query, values);
//   } catch (err) {
//     return err;
//   }
//   return null;
// };

// const checkStock = async (sessionID) => {
//   const queryString = "CALL checkAvailability($1)";
//   const values = [sessionID];
//   try {
//     await sqlConfig.query(queryString, values);
//   } catch (err) {
//     return err;
//   }
//   return null;
// };

// const proceedCheckOut = async (sessionID, loggedIn) => {
//   const productDetailsObject = {
//     delivery_info: { delivery_charge: 0, delivery_days: "unknown" },
//   };
//   let result;
//   if (loggedIn) {
//     const userInfoQueryString = `SELECT email, first_name, last_name, 
//                                             addr_line1, addr_line2, city, 
//                                             postcode, phone_number,
//                                             delivery_days, delivery_charge 
//                                         from UserDeliveryView, session 
//                                         where UserDeliveryView.customer_id = session.customer_id and 
//                                             session.session_id = $1`;
//     const userInfoValues = [sessionID];
//     result = await sqlConfig.query(userInfoQueryString, userInfoValues);
//     [productDetailsObject.delivery_info] = result.rows;
//   }

//   const itemsInfoQueryString = `SELECT variant_id, product_id, quantity, 
//                                         variant_title, selling_price, product_title 
//                                     from ProductVariantView, session 
//                                     where ProductVariantView.customer_id = session.customer_id and
//                                         session.session_id = $1`;
//   const itemInfoValues = [sessionID];
//   result = await sqlConfig.query(itemsInfoQueryString, itemInfoValues);
//   productDetailsObject.items = result.rows;
//   productDetailsObject.subtotal = 0;
//   productDetailsObject.items.forEach((v) => {
//     // eslint-disable-next-line no-param-reassign
//     v.totalprice = (v.selling_price - 0) * (v.quantity - 0);
//     productDetailsObject.subtotal += v.totalprice;
//   });
//   return productDetailsObject;
// };

module.exports = {
  getCartItems,
//   removeItemFromCart,
//   addItemToCart,
//   transferCartItem,
//   checkStock,
//   proceedCheckOut,
//   editCartItemQuantity,
//   countCartItems,
};
