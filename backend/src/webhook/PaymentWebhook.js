import stripePackage from "stripe";
import env from "../env.js";
import { OrderModel } from "../models/OrderModel.js";
import { OrderStatusEnum } from "../enum/OrderStatusEnum.js";
import { serverError } from "../utils/errorHandler.js";
import mongoose from "mongoose";

// export const createWebHook = async (req, res, next) => {
//     try {
//       const stripe = stripePackage(env.STRIPE_SECRET_KEY);

//       let event = req.body;

//       // Verify webhook signature if an endpoint secret is configured
//       if (env.ENDPOINT_SECRET_KEY) {
//         const signature = req.headers["stripe-signature"];
//         try {
//           event = stripe.webhooks.constructEvent(
//             req.body,
//             signature,
//             env.ENDPOINT_SECRET_KEY
//           );
//         } catch (error) {
//           console.error("Webhook signature verification failed:", error.message);
//           return res.status(400).send("Webhook signature verification failed");
//         }
//       }

//       const { orderId } = event.data.object.metadata || {};
//       if (!orderId) {
//         console.error("Order ID missing in event metadata.");
//         return res.status(400).send("Order ID is required");
//       }

//       console.log("Processing event:", event.type);

//       switch (event.type) {
//         case "payment_intent.canceled":
//           console.log(`Payment Intent for ${event.data.object.amount} was canceled.`);
//           break;

//         case "payment_intent.created":
//           await OrderModel.updateOne(
//             { _id: new mongoose.Types.ObjectId(orderId) },
//             {
//               $set: {
//                 payment: {
//                   paymentId: event.data.object.id,
//                   paymentStatus: OrderStatusEnum.success,
//                   updatedOn: new Date(),
//                 },
//               },
//             }
//           );
//           console.log(`Order ${orderId} updated with successful payment.`);
//           break;

//         case "payment_intent.failed":
//           await OrderModel.updateOne(
//             { _id: new mongoose.Types.ObjectId(orderId) },
//             {
//               $set: {
//                 payment: {
//                   paymentId: event.data.object.id,
//                   paymentStatus: OrderStatusEnum.failed,
//                   updatedOn: new Date(),
//                 },
//               },
//             }
//           );
//           console.log(`Order ${orderId} updated with failed payment.`);
//           break;

//         default:
//           console.log(`Unhandled event type: ${event.type}`);
//           break;
//       }

//       res.status(200).send(); // Acknowledge the event
//     } catch (error) {
//       console.error("Error handling webhook:", error);
//       return next(serverError(error));
//     }
//   };

export const createWebHook = async (req, res, next) => {
  try {
    const stripe = stripePackage(env.STRIPE_SECRET_KEY);

    let event = req.body;

    // console.log("evveeeeeeee:::",event)

    if (env.ENDPOINT_SECRET_KEY) {
      const signature = req.headers["stripe-signature"];

      //   console.log("sign:::::",signature)

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          env.ENDPOINT_SECRET_KEY
        );
      } catch (error) {
        console.log("Webhook Signature Verification Failed", error.message);
        return res.sendStatus(400);
      }
    }

    // console.log("event:::::",event)
    let paymentIntent 
    const { orderId } = event.data.object.metadata;


    switch (event.type) {
      case "payment_intent.canceled":
        paymentIntent = event.data.object;
        console.log(
          `Payment Intent for ${paymentIntent.amount} was cancelled!`
        );

        break;

      case "payment_intent.created":
        paymentIntent = event.data.object;
        console.log(`Payment Intent for ${paymentIntent.amount} was created!`);
        await OrderModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(orderId),
          },
          [
            {
              $set: {
                payment: {
                  paymentId: event.data.object.id,
                  paymentStatus: OrderStatusEnum.success,
                  updatedOn: new Date(),
                },
              },
            },
          ]
        );

        break;

      case "payment_intent.failed":
        paymentIntent = event.data.object;
        console.log(`Payment Intent for ${paymentIntent.amount} was failed!`);
        await OrderModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(orderId),
          },
          [
            {
              $set: {
                payment: {
                  paymentId: event.data.object.id,
                  paymentStatus: OrderStatusEnum.failed,
                  updatedOn: new Date(),
                },
              },
            },
          ]
        );

        break;

      default:
        console.log(`Unhandled event type ${event.type}.`);
        res.send();
    }
  } catch (error) {
    console.log(error);
    return next(serverError(error));
  }
};
