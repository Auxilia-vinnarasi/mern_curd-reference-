import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getCategory, createCategory } from "../apiconfig/user";

const UpdateCategory = ({ match }) => {
    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
    });

    const { name, photo, error } = values;

    const preload = (categoryId) => {
        debugger;
        getCategory(categoryId).then((data) => {
            console.log(data, "==========>");
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.data.name,
                    photo: data.photo,
                });
            }
        });
    };
    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!name || !photo) {
            alert("all field required");
        }
        setValues({ ...values, error: "", loading: true });
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("type", "edit");
        formData.append("id", match.params.productId);
        await createCategory(formData).then((data) => {
            console.log("data-------------->>", data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    photo: "",
                    loading: false,
                    createdProduct: data.name,
                });
            }
        });
        history.push("/category");
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
                                <button
                                    type="submit"
                                    className="btn btn-outline-success mb-3"
                                    onClick={onSubmit}
                                >
                                    Update Category
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

export default UpdateCategory;
