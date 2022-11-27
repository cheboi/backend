const express = require("express");
const cors = require('cors');
const { router } = require("./routes/productRoutes");
const dotenv = require("dotenv");
const { userRoutes } = require("./Routes/userRoutes");
const { cartRoutes } = require("./routes/cartRoutes")

const app = express();
dotenv.config();
const corsOption = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.use(cors())
app.use(express.json());
app.use("/products", router);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});
