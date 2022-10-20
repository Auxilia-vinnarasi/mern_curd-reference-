import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCategory } from "../apiconfig/user";
import { useHistory } from "react-router";

const AddCategory = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        photo: "",
        loading: false,
        createdcategory: "",
        error: "",
        getRedirect: false,
    });

    const { name, photo, error, createdcategory, getRedirect, loading } =
        values;

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!name || !photo) {
            alert("all field required");
        }
        setValues({ ...values, error: "", loading: true });
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        console.log(formData);
        await createCategory(formData)
            .then((res) => console.log("res----->", res))
            .catch((err) => console.log("err----->", err));
        setValues({ ...values, error: "", loading: false });
        setValues({ name: "", photo: "" });
        history.push("/category");
    };
    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };
    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdcategory ? "" : "none" }}
        >
            <h4>{createdcategory} created successfullly</h4>
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
                                >
                                    Create Category
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

export default AddCategory;
