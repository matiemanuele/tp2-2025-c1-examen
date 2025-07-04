import express from "express";
import {
  getAllSales,
  getRankingProductsController,
  getSaleByIdController,
  getSalesByClientController,
  getSalesTotalController,
  getUpdateCouponController,
} from "../controllers/salesController.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total", getSalesTotalController); //paginado
router.get("/customer/:email", getSalesByClientController); //email param
router.put("/updateCoupon", getUpdateCouponController); //?id= query
router.get("/top-products", getRankingProductsController); //?limit= query
router.get("/:id", getSaleByIdController);

export default router;
