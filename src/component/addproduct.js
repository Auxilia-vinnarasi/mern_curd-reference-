import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createProduct, getAllCategories } from "../apiconfig/user";
import { useHistory } from "react-router";

const AddProduct = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        createdProduct: "",
        error: "",
        getRedirect: false,
        formData: "",
    });

    const {
        name,
        description,
        price,
        photo,
        categories,
        category,
        createdProduct,
    } = values;

    const getallcategory = async () => {
        await getAllCategories().then((data) => {
            console.log("data=================>", data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };
    useEffect(() => {
        getallcategory();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!name || !description || !price || !photo) {
            alert("all firld required");
        }
        setValues({ ...values, error: "", loading: true });
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        console.log(formData);
        await createProduct(formData).then((res) => {
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                loading: false,
                createdProduct: res.name,
            });
        });
        setValues({ name: "", price: "", description: "", loading: false });
        history.push("/products");
    };
    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };
    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>{createdProduct} created successfullly</h4>
        </div>
    );

    const createProductForm = () => (
        <div class="container">
            <div class="modal1" id="myModal1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form
                                onSubmit={onSubmit}
                                encType="multipart/form-data"
                            >
                                <span>Post photo</span>
                                <div className="form-group">
                                    <label className="btn btn-block btn-success">
                                        <input
                                            onChange={handleChange("photo")}
                                            type="file"
                                            name="photo"
                                            accept=".png, .jpg, .jpeg"
                                            placeholder="choose a file"
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={handleChange("name")}
                                        name="photo"
                                        placeholder="Name"
                                        value={name}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        onChange={handleChange("description")}
                                        name="photo"
                                        placeholder="Description"
                                        className="form-control"
                                        value={description}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={handleChange("price")}
                                        type="number"
                                        placeholder="Price"
                                        className="form-control"
                                        value={price}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        onChange={handleChange("category")}
                                        className="form-control"
                                        placeholder="Category"
                                    >
                                        <option>Select</option>
                                        {categories &&
                                            categories.map((cate, index) => (
                                                <option
                                                    key={index}
                                                    value={cate._id}
                                                >
                                                    {cate.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-success mb-3"
                                >
                                    Create Product
                                </button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <Link to="/products" class="btn btn-danger">
                                Close
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Link to="/">Back</Link>
            <div>
                <div>
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </>
    );
};

export default AddProduct;
