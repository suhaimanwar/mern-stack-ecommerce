import { OrderModel } from "../../models/OrderModel.js";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";

export const Order = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { shippingDetails, cartItems } = req.body;

    const shippingCost = 20;

    if (!shippingDetails) {
      return next(validationError("Details not found!"));
    }

    // console.log("shipDet::", req.body)
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(422).json({
        success: false,
        message: "Items not found",
      });
    }

    //if items are deleted when it is in cart, it shouldnt process.

    const matchedProducts = [];

    const itemIds = cartItems.map((item) => item.productId);

    for (const itemId of itemIds) {
      const products = await ProductModel.find({
        _id: itemId,
        deletedAt: null,
      }).lean(); // lean is used for removing unneccessary datas.
      matchedProducts.push(...products);
    }

    if (cartItems.length != matchedProducts.length) {
      return res.status(404).json({
        success: false,
        message: "Items not found",
      });
    }

    //to find price and total

    let total = 0;

    console.log("matchhhhhhhh::::",matchedProducts)


    const orderItems = cartItems.map((cartItem) => {
      const price = matchedProducts.find(
        (item) => item._id.toString() === cartItem.productId.toString()
      )?.price;
    
      // console.log("quantity:::::", cartItem.quantity);
      // console.log("price::::", price);
    
      total = total + price * cartItem.quantity;
    
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: price,
      };
    });
    

    const grandTotal = shippingCost + total;

    const order = await OrderModel.create({
      userId: userId,
      items: orderItems,
      shippingCost: shippingCost,
      grandTotal: grandTotal,
      shippingDetails: shippingDetails,
      deletedAt: null,
    });

    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      data: { orderDetails: order },
    });
  } catch (error) {
    return next(serverError(error));
  }
};
