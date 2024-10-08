import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;
  if (!data.name || !data.price || !data.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newData = new Product(data);
  try {
    await newData.save();
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product is invalid" });
  }
  const newData = req.body;
  try {
    const data = await Product.findByIdAndUpdate(id, newData, { new: true });
    if (!data) {
      return res.status(404).json({ message: "Product is invalid" });
    }
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req, res) => {
  const data = await Product.find({});
  try {
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product is invalid" });
  }
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Product is invalid" });
    }
    res.status(201).json({ success: true, message: "product deleted" });
  } catch (err) {
    res.status(500).json(error.message);
  }
});

export default router;
