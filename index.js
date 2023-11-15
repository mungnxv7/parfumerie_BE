import express from "express";
import cors from "cors";
import connect from "./src/config/config_db.js";
import routes from "./src/routes/productRoutes.js";
const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/products", routes);

connect();
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
