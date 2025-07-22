import stripePackage from "stripe";
import { OrderModel } from "../../models/OrderModel.js";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import env from "../../env.js";
import { orderMail } from "../../utils/mail.js";

export const Order = async (req, res, next) => {
  try {
    // const stripe = stripePackage(env.STRIPE_SECRET_KEY)
    const { userId } = req.user;
    // console.log("reeeeeeeeeeeeeee",req.user)

    const { shippingDetails, cartItems } = req.body;

    // console.log("sheepp::::",shippingDetails)

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

    //itemIds - array 

    //itemId - Name Declaration
    for (const itemId of itemIds) {
      const products = await ProductModel.find({
        _id: itemId,
        deletedAt: null,
      }).lean(); // lean is used for removing unneccessary datas.
      matchedProducts.push(...products); //will push the product datas
    }

    if (cartItems.length != matchedProducts.length) {
      return res.status(404).json({
        success: false,
        message: "Items not found",
      });
    }

    //to find price and total

    let total = 0;

    // console.log("matchhhhhhhh::::", matchedProducts);
    //cartitemsil - id
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

    // await orderMail(shippingDetails.firstName, shippingDetails.email);

    // console.log('ordddddd:::',order)
    //payment
    //Create Customer

    // console.log("sess::::",session.client_secret)

    return res.status(200).json({
      success: true,
      message: "Order Placed",
      data: { orderID: order._id },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const payment = async (req, res, next) => {
  try {
    const stripe = stripePackage(env.STRIPE_SECRET_KEY); //STRIPE ACCOUNT CREATE - SECRET KEY IN ENV

    const { orderID } = req.query; //rEQUEST FROM QUERY

    const orderDetails = await OrderModel.findOne({
      _id: orderID,
      deletedAt: null,
    });

    // console.log("orderDETAI:::::::::",orderDetails)

    const customer = await stripe.customers.create({
      name: orderDetails.shippingDetails.firstName,
      address: {
        line1: orderDetails.shippingDetails.address,
        postal_code: orderDetails.shippingDetails.zipcode,
        city: "Kannur",
        state: "Kerala",
        country: orderDetails.shippingDetails.country,
      },
    });

    // console.log("cust:::::",customer)

    const session = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: orderDetails.grandTotal * 100,
      currency: "inr",
      shipping: {
        name: orderDetails.shippingDetails.firstName,
        address: {
          line1: orderDetails.shippingDetails.address,
          city: "Kannur",
          state: "Kerala",
          country: orderDetails.shippingDetails.country,
        },
      },

      automatic_payment_methods: {
        enabled: true,
      },

      description: "order",

      metadata: {
        orderId: orderID.toString(),
        type: "order",
      },
      receipt_email: orderDetails.email,
    });

    return res.status(200).json({
      success: true,
      message: "Order Fetched",
      data: { sessionId: session.client_secret, amount: session.amount },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

// export const Order = async (req, res, next) => {
//   try {

//     const stripe = stripePackage(env.STRIPE_SECRET_KEY)
//     const { userId } = req.user;

//     const { shippingDetails, cartItems } = req.body;

//     console.log("sheepp::::",shippingDetails)

//     const shippingCost = 20;

//     if (!shippingDetails) {
//       return next(validationError("Details not found!"));
//     }

//     // console.log("shipDet::", req.body)
//     if (!Array.isArray(cartItems) || cartItems.length === 0) {
//       return res.status(422).json({
//         success: false,
//         message: "Items not found",
//       });
//     }

//     //if items are deleted when it is in cart, it shouldnt process.
//     const matchedProducts = [];

//     const itemIds = cartItems.map((item) => item.productId);

//     for (const itemId of itemIds) {
//       const products = await ProductModel.find({
//         _id: itemId,
//         deletedAt: null,
//       }).lean(); // lean is used for removing unneccessary datas.
//       matchedProducts.push(...products);
//     }

//     if (cartItems.length != matchedProducts.length) {
//       return res.status(404).json({
//         success: false,
//         message: "Items not found",
//       });
//     }

//     //to find price and total

//     let total = 0;

//     // console.log("matchhhhhhhh::::", matchedProducts);

//     const orderItems = cartItems.map((cartItem) => {
//       const price = matchedProducts.find(
//         (item) => item._id.toString() === cartItem.productId.toString()
//       )?.price;

//       // console.log("quantity:::::", cartItem.quantity);
//       // console.log("price::::", price);

//       total = total + price * cartItem.quantity;

//       return {
//         productId: cartItem.productId,
//         quantity: cartItem.quantity,
//         price: price,
//       };
//     });

//     const grandTotal = shippingCost + total;

//     const order = await OrderModel.create({
//       userId: userId,
//       items: orderItems,
//       shippingCost: shippingCost,
//       grandTotal: grandTotal,
//       shippingDetails: shippingDetails,
//       deletedAt: null,
//     });

//     console.log('ordddddd:::',order)
//     //payment
//     //Create Customer

//     const customer = await stripe.customers.create({
//       name: shippingDetails.firstName,
//       address: {
//         line1: shippingDetails.address,
//         postal_code: shippingDetails.zipcode,
//         city: 'Kannur',
//         state: 'Kerala',
//         country: shippingDetails.country,
//       },
//     });

//     //payment session

//     const session = await stripe.paymentIntents.create({
//       customer: customer.id,
//       amount: grandTotal * 100,
//       currency: "inr",
//       shipping: {
//         name: shippingDetails.firstName,
//         address: {
//           line1: shippingDetails.address,
//           city: "Kannur",
//           state: "Kerala",
//           country: shippingDetails.country,
//         },
//       },

//       automatic_payment_methods: {
//         enabled: true
//       },

//       description: 'order',

//       metadata: {
//         orderId: order._id.toString(),
//         type: 'order'
//       },
//       receipt_email: shippingDetails.email
//     });

//     // console.log("sess::::",session.client_secret)

//     return res.status(200).json({
//       success: true,
//       message: "Order Placed",
//       data: { orderDetails: order },
//       sessionId: session.client_secret,
//       amount:session.amount

//     });
//   } catch (error) {
//     return next(serverError(error));
//   }
// };
