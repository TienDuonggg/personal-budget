import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/personal_budget")

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  // Định nghĩa mô hình Envelopes
  const envelopeSchema = new mongoose.Schema({
    name: String,
    balance: Number,
  });
  const Envelope = mongoose.model("Envelope", envelopeSchema);

  export default Envelope