const cartService = require("../services/cart.service");

exports.create = (req, res, next) => {
  var model = {
    userId: req.user.userId,
    products: req.body.products,
  };
  cartService.addCart(model, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.findAll = (req, res, next) => {
  cartService.getCart({ userId: req.user.userId }, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

exports.delete = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const productId = req.body.productId;
    const qty = req.body.qty;

    const result = await cartService.removeCartItem({ userId, productId, qty });

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};