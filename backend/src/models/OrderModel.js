import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
        type: Number,
        require: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],

    total: {
        type: Number,
        required: false
    },
    shippingCost: {
        type: Number,
        required: false
    },
    grandTotal: {
        type: Number,
        required: false
    },

    shippingDetails: {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        phone: {
            type: Number,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        zipcode: {
            type: Number,
            required: false
        },
    },

    deletedAt: {
        type: Date,
        required: false,
      },


  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("orders", orderSchema);
