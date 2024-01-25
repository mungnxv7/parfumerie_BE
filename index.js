import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./src/config/config_db.js";
import routesUser from "./src/routes/userRoutes.js";
import routesCategory from "./src/routes/categoryRoutes.js";
import routesHotels from "./src/routes/hotelsRoutes.js";
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
app.use("/hotels", routesHotels);
app.use("/auth", routesUser);
app.use("/categories", routesCategory);
connect(API_SERVER);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
