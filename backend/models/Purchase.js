import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  item: String,
  date: String,
  amount: String,
  status: String
});

export default mongoose.model("Purchase", purchaseSchema);
