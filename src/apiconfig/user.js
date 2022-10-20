import { API } from "../server";
import axios from "axios";

//user fetch
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
};
export const signin = (user) => {
    console.log("API-------->", API);
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));
};
export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    }
};
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

//product fetch ==========================================================>>>>>>>>>>>>>
export const createProduct = (product) => {
    return fetch(`${API}/product/updateproduct`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: product,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getallproduct = async (param, url) => {
    const config = {
        method: "post",
        url: `${API}${url}`,
        data: { ...param },
    };
    const response = await axios(config);
    return response;
};

export const getProduct = (productId) => {
    return fetch(`${API}/getproduct/${productId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const deleteproduct = (id) => {
    return fetch(`${API}/deleteproduct/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => res.json("res----------", res))
        .catch((err) => console.log("err------->", err));
};
//product fetch ==========================================================>>>>>>>>>>>>>
export const createCategory = (product, token) => {
    return fetch(`${API}/category/updatecategory`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: product,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const getallCategory = async (param, url) => {
    const config = {
        method: "post",
        url: `${API}${url}`,
        data: { ...param },
    };
    const response = await axios(config);
    return response;
};
export const getAllCategories = () => {
    return fetch(`${API}/getallcategory`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const getCategory = (categoryId) => {
    return fetch(`${API}/getcategory/${categoryId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const deletecategory = (id) => {
    return fetch(`${API}/deletecategory/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => res.json("res----------", res))
        .catch((err) => console.log("err------->", err));
};
