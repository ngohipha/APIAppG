const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName:{
                type: String,
                required:true,
                unique: true,
            },
            categoryDescription:{
                type: String,
                required:false,

            },
            categoryImage:{
                type: String,
            }
        },
        {
            // mongodb trar veef id gach duoi khoa chinh bat ky mo hinh 
            //  chuyen doi ham json tra ve id
            //  delete xoa _id thay vao id doanh muc 
            // delete _v nhan duoc bien theo yeu cau 
            toJSON:{
                transform: function (doc,ret){
                    ret.categoryId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            }
        }
    )
);
module.exports = {
    category,
}