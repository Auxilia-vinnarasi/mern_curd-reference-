import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";

const TableList = (props) => {
    const history = useHistory();
    console.log("------>ddd", props.category);
    const products = () => (
        <div>
            Search:
            <input
                style={{ width: "200px", margin: "5px" }}
                type="text"
                placeholder="Search Name"
                onChange={props.onserach}
            />
            Sort Name :{" "}
            <span className="sort">
                <select
                    value={props.sort_order}
                    onChange={(e) => props.setsort(e)}
                >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </span>
            {"  "}
            Sort Price:{" "}
            <span className="sort">
                <select
                    value={props.sort_orderprice}
                    onChange={(e) => props.sortingprice(e)}
                >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </span>
            <span style={{ margin: "10px" }}>
                From :{" "}
                <input
                    value={props.start}
                    onChange={(e) => props.datefilter(e)}
                    type="date"
                    placeholder="from"
                />
                To :{" "}
                <input
                    value={props.end}
                    onChange={(e) => props.dateto(e)}
                    type="date"
                    placeholder="to"
                />
                {"  "}
                <button onClick={props.getproduc}>Check</button>
            </span>
            <table class="table table-sm">
                <thead>
                    {props.products.map((product) => (
                        <tr>
                            <th scope="col">{product.name}</th>
                            <th scope="col">{product.price}</th>
                            <th scope="col">{product.description}</th>
                            <th scope="col">{product.image}</th>
                            <th scope="col">{product.action}</th>
                        </tr>
                    ))}
                </thead>
                {props.productArr.map((product, key) => {
                    console.log(product, "------------------");
                    return (
                        <tr key={key}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <img
                                    style={{ width: "50px", height: "50px" }}
                                    src={product.photo}
                                    alt="..."
                                />
                            </td>
                            <td>
                                <button className="btn btn-outline-success mb-3">
                                    <Link
                                        to={`/product/update/${product._id}`}
                                        data-toggle="modal2"
                                        data-target="#myModal2"
                                    >
                                        Edit
                                    </Link>
                                </button>
                                {"  "}
                                <button
                                    className="btn btn-outline-success mb-3"
                                    type="button"
                                    onClick={() => {
                                        props.deleteProduct(product._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tbody></tbody>
            </table>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={props.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
    const category = () => (
        <div>
            Search:
            <input
                style={{ width: "200px", margin: "5px" }}
                type="text"
                placeholder="Search Name"
                onKeyUp={props.onserach}
            />
            Sort Name:{" "}
            <span className="sort">
                <select
                    value={props.sort_order}
                    onChange={(e) => props.setsort(e)}
                >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </span>
            <span style={{ margin: "10px" }}>
                From :{" "}
                <input
                    value={props.start}
                    onChange={(e) => props.datefilter(e)}
                    type="date"
                    placeholder="from"
                />{" "}
                To :{" "}
                <input
                    value={props.end}
                    onChange={(e) => props.dateto(e)}
                    type="date"
                    placeholder="to"
                />
                {"  "}
                <button onClick={props.getcategory}>Check</button>
            </span>
            <table class="table table-sm">
                <thead>
                    {props.categoryscomponent.map((product) => (
                        <tr>
                            <th scope="col">{product.name}</th>
                            <th scope="col">{product.image}</th>
                            <th scope="col">{product.action}</th>
                        </tr>
                    ))}
                </thead>
                {props.category.map((product, key) => {
                    return (
                        <tr key={key}>
                            <td>{product.name}</td>
                            <td>
                                <img
                                    style={{ width: "50px", height: "50px" }}
                                    src={product.photo}
                                    alt="..."
                                />
                            </td>
                            <td>
                                <button className="btn btn-outline-success mb-3">
                                    <Link
                                        to={`/category/update/${product._id}`}
                                        data-toggle="modal2"
                                        data-target="#myModal2"
                                    >
                                        Edit
                                    </Link>
                                </button>
                                {"  "}
                                <button
                                    className="btn btn-outline-success mb-3"
                                    type="button"
                                    onClick={() => {
                                        props.deletecate(product._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tbody></tbody>
            </table>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={props.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
    return (
        <>
            {history.location.pathname === "/products"
                ? products()
                : category()}
        </>
    );
};
export default TableList;
