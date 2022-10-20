const express = require("express");
const router = express.Router();
const multer = require("multer");
const Testproduct = require("../models/product");
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");

const {
    getProductById,
    getProduct,
    deleteproduct,
    getallproduct,
} = require("../controllers/product");
const {
    getCategoryById,
    getCategory,
    deleteCategory,
    getallCategory,
    getAllCategories,
} = require("../controllers/category");
//params route
router.param("productId", getProductById);
router.param("categoryId", getCategoryById);

//file upload
const DIR = "./upload/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

//product create and update
router.post(
    "/product/updateproduct",
    upload.single("photo"),
    async (req, res, next) => {
        const request = req.body;
        if (request.type === "edit") {
            const url = req.protocol + "://" + req.get("host");
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.price;
            const photo = url + "/public/" + req.file.filename;
            const data = { name, description, price, photo };
            await Testproduct.findOneAndUpdate(
                { _id: request.id },
                { $set: data }
            ).exec();
            return res.status(200).json({ message: "successfully updated" });
        } else {
            const url = req.protocol + "://" + req.get("host");
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.price;
            const photo = url + "/public/" + req.file.filename;
            const da = { name, description, price, photo };
            var product = new Testproduct(da);
            product = await product.save();
            return res.status(200).json({ message: "successfully added" });
        }
    }
);
//getsingleproduct api
router.get("/getproduct/:productId", getProduct);
//delete
router.post("/deleteproduct/:id", deleteproduct);
//getallproduct
router.post("/getallproduct", getallproduct);

//category
router.post(
    "/category/updatecategory",
    upload.single("photo"),
    async (req, res, next) => {
        const request = req.body;
        if (request.type === "edit") {
            const url = req.protocol + "://" + req.get("host");
            const name = req.body.name;
            const photo = url + "/public/" + req.file.filename;
            const data = { name, photo };
            await Category.findOneAndUpdate(
                { _id: request._id },
                { $set: data }
            ).exec();
            return res
                .status(200)
                .json({ message: "successfully updated", data: data });
        } else {
            console.log("req.body",req.body)
            const url = req.protocol + "://" + req.get("host");
            const name = req.body.name;
            const photo = url + "/public/" + req.file.filename;
            const da = { name, photo };
            var product = new Category(da);
            console.log("-------->",product)
            product = await product.save();
            return res.status(200).json({ message: "successfully added" ,data:product});
        }
    }
);
//getsingleproduct api
router.get("/getcategory/:categoryId", getCategory);
//delete
router.post("/deletecategory/:id", deleteCategory);
//getallproduct
router.post("/getallcategorypagination", getallCategory);
router.get("/getallcategory", getAllCategories);

module.exports = router;
