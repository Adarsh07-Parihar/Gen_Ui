import express from "express";
import { fakePayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/fake-payment", fakePayment);

export default router;