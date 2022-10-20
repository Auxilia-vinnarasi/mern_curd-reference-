import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getProduct, createProduct, getAllCategories } from "../apiconfig/user";

const UpdateProduct = ({ match }) => {
    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
    });

    const { name, description, categories, category, price, photo } = values;

    const preload = (productId) => {
        getProduct(productId).then((data) => {
            console.log(data, "==========>");
            if (data.data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.data.name,
                    description: data.data.description,
                    price: data.data.price,
                    photo: data.data.photo,
                });
                preloadCategories();
            }
        });
    };
    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const preloadCategories = () => {
        getAllCategories().then((data) => {
            console.log("data--------------", data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ categories: data });
            }
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!name || !description || !price || !photo) {
            alert("all firld required");
        }
        setValues({ ...values, error: "", loading: true });
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("type", "edit");
        formData.append("price", price);
        formData.append("description", description);
        formData.append("id", match.params.productId);
        await createProduct(formData).then((data) => {
            console.log("data-------------->>", data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    loading: false,
                    createdProduct: data.name,
                });
            }
        });
        history.push("/products");
    };

    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };
    const createProductForm = () => (
        <div class="container">
            <div class="modal2" id="myModal2">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form encType="multipart/form-data">
                                <span>Post photo</span>
                                <div className="form-group">
                                    <label className="btn btn-block btn-success">
                                        <input
                                            onChange={handleChange("photo")}
                                            type="file"
                                            name="photo"
                                            accept=".png, .jpg, .jpeg"
                                            placeholder="choose a file"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={handleChange("name")}
                                        name="name"
                                        placeholder="Name"
                                        value={name}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        onChange={handleChange("description")}
                                        name="description"
                                        placeholder="Description"
                                        value={description}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={handleChange("price")}
                                        type="number"
                                        placeholder="Price"
                                        className="form-control"
                                        value={price}
                                        required
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
                                    onClick={onSubmit}
                                >
                                    Update Product
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
            <div>
                <div>{createProductForm()}</div>
            </div>
        </>
    );
};

export default UpdateProduct;
