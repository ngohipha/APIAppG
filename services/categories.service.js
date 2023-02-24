const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createCategory(params, callback) {
  if (!params.categoryName) {
    return callback(
      {
        message: "Category Name Required",
      },
      ""
    );
  }
  const model = new category(params);
  model
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getCategories(params, callback) {
  const categoryName = params.categoryName;
  var condition = categoryName
    ? {
        // tim nap co ban ghi de khop danh muc
        categoryName: { $regex: new RegExp(categoryName), $options: "i" },
      }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
  let page = (Math.abs(params.page) || 1) - 1;

  // dat dieu kien dau ra danh muc va hinh anh danh muc chung hien thi . mac dinh ID
  // gioi han moi trang
  // skip bo qa trang
  category
    .find(condition, "categoryName categoryImage")
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
  // ex totalRecord = 20 , pageSize = 10. Page 1 =>
}

async function getCategoryById(params, callback) {
  const categoryId = params.categoryId;

  category
    .findById(categoryId)
    .then((response) => {
      if (!response) callback("Not Found Category witd Id" + category);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateCategory(params, callback) {
  const categoryId = params.categoryId;

  category
    .findByIdAndUpdate(categoryId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback("Not Found Category witd Id" + categoryId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteCategory(params, callback) {
  const categoryId = params.categoryId;

  category
    .findByIdAndDelete(categoryId)
    .then((response) => {
      if (!response) callback("Not Found Category witd Id" + categoryId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
