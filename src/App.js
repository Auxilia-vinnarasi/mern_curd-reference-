import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./component/adminroute";
import SignIn from "./component/signin";
import Signup from "./component/signup";
import { Home } from "./component/home";
import AddProduct from "./component/addproduct";
import AddCategory from "./component/addcategory";
import Navbar from "./component/navbar";
import ManageProducts from "./component/manageproduct";
import UpdateProduct from "./component/updateproduct";
import UpdateCategory from "./component/updatecategory";

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={SignIn} />
                <AdminRoute path="/addproduct" exact component={AddProduct} />
                <AdminRoute path="/addcategory" exact component={AddCategory} />
                <AdminRoute path="/products" exact component={ManageProducts} />
                <AdminRoute path="/category" exact component={ManageProducts} />
                <AdminRoute
                    path="/product/update/:productId"
                    exact
                    component={UpdateProduct}
                />
                <AdminRoute
                    path="/category/update/:categoryId"
                    exact
                    component={UpdateCategory}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
