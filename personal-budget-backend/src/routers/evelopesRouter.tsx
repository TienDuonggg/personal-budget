
import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import validateEnvelope from "../middlewares/validateEnvelope";
import Envelope from "../models";


const eveLopesRouter = express.Router();

eveLopesRouter.get("/", asyncHandler(async (req : Request, res: Response) => {
    const envelopes = await Envelope.find()
    
  res.json(envelopes);
}));

eveLopesRouter.post("/",validateEnvelope,  asyncHandler ( async (req : Request, res: Response) => {
    const {name, balance} = req.body
   
    const newEnvelopes = new Envelope({name, balance
    })
    await newEnvelopes.save()
  
  res.status(201).json(newEnvelopes);
}));

eveLopesRouter.get("/:id", asyncHandler ( async (req : Request, res: Response) => {
  const {id} = req.params


  const envelopeId = await Envelope.findById(id)
  if(!envelopeId){
    throw { status: 404, message: "Envelope không tồn tại" }
  }
  
res.status(201).json(envelopeId);
}));


eveLopesRouter.put("/:id", validateEnvelope,  asyncHandler ( async (req : Request, res: Response) => {
    const {id} = req.params
    const {name, balance} = req.body
    const updatedEnvelope = await Envelope.findByIdAndUpdate(id, {name, balance}, {new: true})

    if(!updatedEnvelope){
      throw { status: 404, message: "Envelope không tồn tại" }
    }
  res.send(updatedEnvelope);
}));


eveLopesRouter.delete("/:id", asyncHandler ( async (req : Request, res: Response) => {
  const {id} = req.params
  const envelopes = await Envelope.findByIdAndDelete(id)
  if(!envelopes){
    throw { status: 404, message: "Envelope không tồn tại" }
  }
  res.json(envelopes);
}));

export default eveLopesRouter;