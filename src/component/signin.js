import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../apiconfig/user";

const Signin = () => {
    const { user } = isAuthenticated();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
    });

    const { email, password, error, loading, didRedirect } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        await signin({ email, password })
            .then((res) => {
                if (res.error) {
                    setValues({ ...values, error: res.error });
                } else {
                    authenticate(res, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                    });
                }
            })
            .catch((error) => console.log(error));
    };
    const perdormredirect = () => {
        if (didRedirect) {
            if (user) {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                className="form-control"
                                onChange={handleChange("email")}
                                value={email}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                className="form-control"
                                onChange={handleChange("password")}
                                value={password}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            onClick={onSubmit}
                            className="btn btn-success btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {perdormredirect()}
        </>
    );
};

export default Signin;
