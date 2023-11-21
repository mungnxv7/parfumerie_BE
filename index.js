import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./src/config/config_db.js";
import routesProduct from "./src/routes/productRoutes.js";
import routesUser from "./src/routes/userRoutes.js";
const app = express();

dotenv.config();

const { API_SERVER, API_LOCAL, PORT } = process.env;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/products", routesProduct);
app.use("/user", routesUser);
connect(API_SERVER);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
