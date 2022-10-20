const Category = require("../models/category");
const moment = require("moment");

exports.getCategoryById = (req, res, next, id) => {
    console.log("---------", id);
    Category.findById(id).exec((err, product) => {
        if (err) {
            return res.status(400).json({ error: "Product not found" });
        } else {
            return res.status(200).json({ success: "Product", data: product });
        }
    });
};

exports.getCategory = async (req, res) => {
    return res.json(req.category);
};

//delete
exports.deleteCategory = async (req, res, next) => {
    await Category.findById(req.params.id, async (err, user) => {
        if (user) {
            await user.remove();
        }
    });

    return res.status(200).json({ message: "deleted success" });
};

//getallproduct
exports.getallCategory = async (req, res) => {
    console.log("-------->", req.body);
    let aggregate_options = [];

    //pagination
    let page = parseInt(req.body.page) || 1;
    let limit = parseInt(req.body.limit) || 10;

    const options = {
        page,
        limit,
        collation: { locale: "en" },
        customLabels: {
            totalDocs: "totalResults",
            docs: "events",
        },
    };

    let match = {};
    //serach
    if (typeof req.body.search != "undefined" && req.body.search != "") {
        match.$or = [
            { name: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
            { price: { $regex: ".*" + req.body.search + ".*", $options: "i" } },
        ];
    }

    //filterdate
    if (req.body.start) {
        let start = moment(req.body.start).startOf("day");
        let end = moment(req.body.start).endOf("day");
        if (req.body.end) end = req.body.end;
        aggregate_options.push({
            $match: {
                createdAt: { $gte: new Date(start), $lte: new Date(end) },
            },
        });
    } else if (req.body.end) {
        aggregate_options.push({
            $match: { createdAt: { $lte: new Date(req.body.end) } },
        });
    }
    //sorting
    if (req.body.sort_order && typeof req.body.sort_order != "undefined") {
        let sort_order =
            req.body.sort_order && req.body.sort_order === "asc" ? 1 : -1;
        let sort_by = req.body.sort_by || "createdAt";
        aggregate_options.push({
            $sort: {
                [sort_by]: sort_order,
                _id: -1,
            },
        });
    }

    const myAggregate = Category.aggregate(aggregate_options);
    const result = await Category.aggregatePaginate(myAggregate, options);
    res.status(200).json({ data: result });
};

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "no category found",
            });
        }
        res.json(categories);
    });
};
