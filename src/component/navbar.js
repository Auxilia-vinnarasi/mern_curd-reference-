import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../apiconfig/user";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" };
    } else {
        return { color: "#FFFFFF" };
    }
};
const Navbar = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link
                    style={currentTab(history, "/")}
                    className="nav-link"
                    to="/"
                >
                    Home
                </Link>
            </li>
            {isAuthenticated() && (
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Product
                    </button>
                    <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                    >
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">
                                    Product List
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/addproduct"
                                    data-toggle="modal1"
                                    data-target="#myModal1"
                                >
                                    Add Product
                                </Link>
                            </li>
                        )}
                    </div>
                </div>
            )}

            {isAuthenticated() && (
                <div class="dropdown" style={{ margin: "0px 0px 0px 10px" }}>
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Category
                    </button>
                    <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                    >
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/category">
                                    Category List
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/addcategory"
                                    data-toggle="modal1"
                                    data-target="#myModal1"
                                >
                                    Add Category
                                </Link>
                            </li>
                        )}
                    </div>
                </div>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/signin")}
                            className="nav-link"
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/signup")}
                            className="nav-link"
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link text-warning"
                        onClick={() => {
                            signout(() => {
                                history.push("/");
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Navbar);
