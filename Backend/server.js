import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.routes.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(5000, () => {
  connectDB();
  console.log("Server running at http://localhost:" + PORT);
});
