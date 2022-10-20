const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
(slug = require("mongoose-slug-updater")), mongoose.plugin(slug);

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
        },
        slug: { type: String, slug: "name" },
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
CategorySchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Category", CategorySchema);
