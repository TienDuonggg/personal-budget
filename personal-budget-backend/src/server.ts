import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/personal_budget")

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
  // Định nghĩa mô hình Envelopes
  const envelopeSchema = new mongoose.Schema({
    name: String,
    balance: Number,
  });
  const Envelope = mongoose.model("Envelope", envelopeSchema);

app.get("/envelopes", async (req, res) => {
    const envelopes = await Envelope.find()
  res.send(envelopes);
});

app.post("/envelopes", async (req, res) => {
    const {name, balance} = req.body
    const newEnvelopes = new Envelope({name, balance
    })
    await newEnvelopes.save()
  res.status(201).json(newEnvelopes);
});

app.put("/envelopes/:id", async (req, res) => {
    const {id} = req.params
    const {name, balance} = req.body
    const updatedEnvelope = await Envelope.findByIdAndUpdate(id, {name, balance}, {new: true})
  res.send(updatedEnvelope);
});
app.delete("/envelopes/:id", async (req, res) => {
  const {id} = req.params
  const envelopes = await Envelope.findByIdAndDelete(id)
  res.json(envelopes);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
