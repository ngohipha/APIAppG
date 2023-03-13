const { cart } = require("../models/cart.model");
var async = require("async");

async function addCart(params, callback) {
  if (!params.userId) {
    return callback({
      message: "UserId Required",
    });
  }

  try {
    //Sau đó, nó cố gắng tìm giỏ hàng của người dùng trong cơ sở dữ liệu bằng findOnehàm. Nếu giỏ hàng không tồn tại, một giỏ hàng mới được tạo bằnguserIdVàproductstừparamstham sốsavechức năngsavechức năng
    const cartDB = await cart.findOne({ userId: params.userId });

    if (cartDB == null) {
      const cartModel = new cart({
        userId: params.userId,
        products: params.products,
      });
      const response = await cartModel.save();
      return callback(null, response);
    }

    else if (cartDB.products.length == 0) {
      cartDB.products = params.products;
      await cartDB.save();
      return callback(null, cartDB);
    } else {
      // Nếu nhưparams.productsmảngmapchức năngfindIndexchức năngproductVàqtycủa cảicartDB.productsmảngsavechức năngqtytài sảncartDB.productsmảngqtycủaparams.productsmảngsavechức năng 
      await Promise.all(params.products.map(async (product) => {
        let itemIndex = cartDB.products.findIndex(
          p => p.product == product.product
        );
        if (itemIndex === -1) {
          cartDB.products.push({
            product: product.product,
            qty: product.qty,
          });
          await cartDB.save();
        }
        else {
          cartDB.products[itemIndex].qty += product.qty;
          await cartDB.save();
        }
      }));
      return callback(null, cartDB);
    }
  } catch (err) {
    return callback(err);
  }
}

async function getCart(params, callback) {
  try {
    const response = await cart.findOne({ userId: params.userId })
      .populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
          select: "productName productPrice productSalePrice productImage",
          populate: {
            path: "category",
            model: "Category",
            select: "categoryName",
          },
        },
      });
    return callback(null, response);
  } catch (error) {
    return callback(error);
  }
}

async function removeCartItem(params) {
  try {
    const cartDB = await cart.findOne({ userId: params.userId });
    if (!cartDB) {
      throw new Error("Cart not found");
    }
    // kt đưa ra lỗi nếu thiếu một trong hai.
    if (!params.productId || !params.qty) {
      throw new Error("Missing required fields");
    }
    const productId = params.productId;
    const qty = params.qty;
    //hàm tìm chỉ mục của mặt hàng trong productsmảng của giỏ hàng bằng cách sử dụng findIndex, và đưa ra lỗi nếu không tìm thấy mặt hàng đó.
    const itemIndex = cartDB.products.findIndex((p) => p.product == productId);
    if (itemIndex === -1) {
      throw new Error("Invalid Product!");
    }
    //Nếu số lượng của mặt hàng trong giỏ hàng khớp với số lượng được yêu cầu, mặt hàng đó sẽ bị xóa khỏi mảng bằng cách sử dụng splice. Nếu số lượng trong giỏ hàng lớn hơn số lượng được yêu cầu, số lượng trong giỏ hàng sẽ được cập nhật để phản ánh số lượng mới. Nếu số lượng trong giỏ hàng ít hơn số lượng được yêu cầu, sẽ xảy ra lỗi.
    if (cartDB.products[itemIndex].qty === qty) {
      cartDB.products.splice(itemIndex, 1);
    } else if (cartDB.products[itemIndex].qty > qty) {
      cartDB.products[itemIndex].qty = cartDB.products[itemIndex].qty - qty;
    } else {
      throw new Error("Enter lower Qty");
    }
    await cartDB.save();
    return "Cart Updated!";
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addCart,
  getCart,
  removeCartItem,
};