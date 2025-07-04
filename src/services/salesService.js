import {
  findAllSales,
  findSaleById,
  findSalesByClient,
  findSalesTotal,
  rankingProducts,
  updateCoupon,
} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
  return await findAllSales(page, pageSize);
};

export const getSaleById = async (id) => {
  return await findSaleById(id);
};

export const getSalesTotal = async (page, pageSize) => {
  return await findSalesTotal(page, pageSize);
};

export const getSalesByClient = async (email) => {
  return await findSalesByClient(email);
};

export const getUpdateCoupon = async (id) => {
  return await updateCoupon(id);
};

export const getRankingProducts = async (limit) => {
  return await rankingProducts(limit);
};
