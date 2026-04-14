import express from "express";
import Purchase from "../models/Purchase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Purchase.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const newPurchase = new Purchase(req.body);
  await newPurchase.save();
  res.json(newPurchase);
});

export default router;
