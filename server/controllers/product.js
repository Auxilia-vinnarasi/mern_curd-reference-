const Testproduct = require("../models/product");
const moment = require("moment");

//getProductid
exports.getProductById = async (req, res, next, id) => {
    await Testproduct.findById(id).exec((err, product) => {
        if (err) {
            return res.status(400).json({ error: "Product not found" });
        } else {
            return res.status(200).json({ success: "Product", data: product });
        }
        next();
    });
};

exports.getProduct = (req, res) => {
    return res.json(req.product);
};

//delete
exports.deleteproduct = async (req, res) => {
    await Testproduct.findById(req.params.id, async (err, user) => {
        if (user) {
            await user.remove();
        }
    });
    return res.status(200).json({ message: "deleted success" });
};

//getallproduct
exports.getallproduct = async (req, res) => {
    let aggregate_options = [];
    //pagination
    let page = parseInt(req.body.page) || 1;
    let limit = parseInt(req.body.limit) || 5;
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
    const myAggregate = Testproduct.aggregate(aggregate_options);
    const result = await Testproduct.aggregatePaginate(myAggregate, options);
    res.status(200).json({ data: result });
};
