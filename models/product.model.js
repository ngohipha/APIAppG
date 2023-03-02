const mongoose = require("mongoose");

const product = mongoose.model(
  "Product",
  mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
        unquie: true,
      },
      // tham chieu category model
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      productShortDescription: {
        type: String,
        required: true,
      },
      productDescrioption: {
        type: String,
        required: false,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productSalePrice: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
      },
      productSKU: {
        type: String,
        required: false,
      },
      productType: {
        type: String,
        required: true,
        default: "simple",
      },
      stockStatus: {
        type: String,
        default: "IN",
      },
      // sua doi json , bat cu khi nao nhan bat ky json nao tu mo hinh nay chuyen doi phan hoi cho rang chung dat vao json
    },
    {
      toJSON: {
        transform: function (doc, ret) {
          ret.productId = ret._id.toString();
          delete ret._id;
          delete ret.__v;
        }
      }
    }
  )
);

module.exports = {
  product,
};
