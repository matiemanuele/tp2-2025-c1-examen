import {
  getRankingProducts,
  getSaleById,
  getSales,
  getSalesByClient,
  getSalesTotal,
  getUpdateCoupon,
} from "../services/salesService.js";

export const getAllSales = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSales(page, pageSize);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSaleByIdController = async (req, res) => {
  try {
    const sale = await getSaleById(req.params.id);
    res.json(sale);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(500).json({ message: "Error en getSaleByIdController" });
  }
};

export const getSalesTotalController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSalesTotal(page, pageSize);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(500).json({ message: "Error en getSalesTotalController" });
  }
};

export const getSalesByClientController = async (req, res) => {
  try {
    const sales = await getSalesByClient(req.params.email);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(500).json({ message: "Error en getSalesByClientController" });
  }
};

export const getUpdateCouponController = async (req, res) => {
  try {
    const sale = await getUpdateCoupon(req.query.id);
    res.json(sale);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(500).json({ message: "Error en getUpdateCouponController" });
  }
};

export const getRankingProductsController = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const items = await getRankingProducts(limit);
    res.json(items);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(500).json({ message: "Error en getRankingProductsController" });
  }
};
