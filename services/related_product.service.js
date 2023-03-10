const { relatedProduct } = require("../models/related_products.model");
const { product } = require("../models/product.model");

async function addRelatedProduct(params, callback) {
  if (!params.product) {
    return callback({
      message: "Product Id Required",
    });
  }
  if (!params.relatedProduct) {
    return callback({
      message: "Related Product Id Required",
    });
  }

  const relatedProductModel = new relatedProduct(params);
  relatedProductModel
    .save()
    .then(async (response) => {
      // them tat ca id theo product , neu phu` hop se~ goi phan bo sung nay de thiet lap mang se noi
      await product.findByIdAndUpdate(
        {
          _id: params.product,
        },
        {
          $addToSet: {
            "relatedProducts": relatedProductModel,
          },
        }
      );
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function removeRelatedProduct(params, callback){
    const id = params.id;

    relatedProduct.findByIdAndRemove(id).then((response) =>{
        if(!response){
            callback("Product Id not found");
        } else {
            callback(null,response);
        }
    }).catch((error) =>{
        return callback(error);
    });
}

module.exports = {
    addRelatedProduct,
    removeRelatedProduct,
}