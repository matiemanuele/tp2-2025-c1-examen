import { ObjectId } from "mongodb";
import { getDbSupplies } from "./connection.js";

export async function findAllSales(page, pageSize) {
  const db = getDbSupplies();
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    const sales = await db
      .collection("sales")
      .find()
      .skip(skip)
      .limit(pageSize)
      .toArray();
    return sales;
  } else {
    // Sin paginación: trae todos los documentos
    const sales = await db.collection("sales").find().toArray();
    return sales;
  }
}

export async function findSaleById(id) {
  const db = getDbSupplies();
  const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
  return sale;
}

export async function findSalesTotal(page, pageSize) {
  const db = getDbSupplies();
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    const sales = await db
      .collection("sales")
      .find()
      .skip(skip)
      .limit(pageSize)
      .toArray();
    const salesTotal = sales.map((sale) => {
      const subtotales = sale.items.map((item) => {
        return item.price * item.quantity;
      });

      let total = 0;
      subtotales.forEach((x) => {
        total += x;
      });

      console.log(subtotales);

      console.log(parseInt(total));
      return {
        ...sale,
        total: total,
      };
    });
    return salesTotal;
  } else {
    const sales = await db.collection("sales").find().toArray();
    const salesTotal = sales.map((sale) => {
      const subtotales = sale.items.map((item) => {
        return item.price * item.quantity;
      });

      let total = 0;
      subtotales.forEach((x) => {
        total += x;
      });

      console.log(subtotales);

      console.log(parseInt(total));
      return {
        ...sale,
        total: total,
      };
    });
    return salesTotal;
  }
}

export async function findSalesByClient(email) {
  const db = getDbSupplies();
  const sales = await db
    .collection("sales")
    .find({ "customer.email": email })
    .toArray();
  return sales;
}

export async function updateCoupon(id) {
  const db = getDbSupplies();
  const sale = await findSaleById(id);
  await db
    .collection("sales")
    .updateOne(
      { _id: sale._id },
      { $set: { couponUsed: sale.couponUsed === true ? false : true } }
    );
  const updatedSale = await findSaleById(id);
  return updatedSale;
}

export async function rankingProducts(limit) {
  const db = getDbSupplies();
  const sales = await db.collection("sales").find().toArray();
  let products = [];
  sales.map((sale) => {
    sale.items.map((item) => {
      products.push(item);
    });
  });
  const ranking = products.sort((a, b) => b.quantity - a.quantity);
  return ranking.slice(0, limit);
}
