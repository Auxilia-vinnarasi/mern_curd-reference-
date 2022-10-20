const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
        },
        photo: {
            type: String,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

productSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Testproduct", productSchema);
