import React, { useState, useEffect } from "react";
import {
    deleteproduct,
    getallproduct,
    getallCategory,
    deletecategory,
} from "../apiconfig/user";
import TableList from "./child";

const Parent = () => {
    const [productscomponent, setproductcomponent] = useState([
        {
            name: "Name",
            price: "Price",
            description: "Description",
            image: "Image",
            action: "Action",
        },
    ]);
    //
    const [categoryscomponent, setcategorycomponent] = useState([
        {
            name: "Name",
            image: "Image",
            action: "Action",
        },
    ]);
    //
    const [sort_order, setsort_order] = useState("asc");
    const [sort_orderprice, setsort_orderprice] = useState("asc");
    const [sort_by, setsort_by] = useState("");
    //
    const [product, setproducts] = useState([]);
    const [category, setcategory] = useState([]);
    //
    const [data, setdata] = useState({ page: 1, limit: 5 });
    const [paginationInfo, setPaginationInfo] = useState({
        page: "1",
        limit: "5",
    });

    const [search, setsearch] = useState("");
    //
    const [startdate, setstartdate] = useState("");
    const [enddate, setenddate] = useState("");

    //
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    console.log("pageCount------", pageCount);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
    };

    //
    const getproduc = async () => {
        const d = {
            ...data,
            page: data.page,
            limit: data.limit,
            search: search,
            sort_order: sort_order,
            sort_by: sort_by,
            start: startdate,
            end: enddate,
        };

        await getallproduct(d, "/getallproduct").then((res) => {
            const data = res.data.data.events;
            console.log("data---", data);
            const slice = data.slice(offset, offset + perPage);
            console.log("slice---", slice);
            setproducts(slice);
            setPageCount(Math.ceil(res.data.data.events.length / perPage));
            setPaginationInfo({
                page: res.data.data.page,
                pages: res.data.data.limit,
            });
        });
    };
    //
    const getcategory = async () => {
        const d = {
            ...data,
            page: data.page,
            limit: data.limit,
            search: search,
            sort_order: sort_order,
            sort_by: sort_by,
            start: startdate,
            end: enddate,
        };

        await getallCategory(d, "/getallcategorypagination").then((res) => {
            const data = res.data.data.events;
            console.log("data---", data);
            const slice = data.slice(offset, offset + perPage);
            console.log("slice---", slice);
            setcategory(slice);
            setPageCount(Math.ceil(res.data.data.totalResults / perPage));
            setPaginationInfo({
                page: res.data.data.page,
                pages: res.data.data.limit,
            });
        });
    };

    useEffect(() => {
        getproduc();
        getcategory(data);
    }, [offset]);

    const onserach = (e) => {
        setsearch(e.target.value);
        getproduc(paginationInfo);
        getcategory(paginationInfo);
    };
    //
    const sorting = (e) => {
        console.log("e", e.target.value);
        setsort_order(e.target.value);
        if (e.target.value === "desc") {
            setsort_by("name");
        } else if (e.target.value === "asc") {
            setsort_by("name");
        }
        getproduc(paginationInfo);
        getcategory(paginationInfo);
    };
    const sortingprice = (e) => {
        console.log("e", e.target.value);
        setsort_orderprice(e.target.value);
        if (e.target.value === "desc") {
            setsort_by("price");
        } else if (e.target.value === "asc") {
            setsort_by("price");
        }
        getproduc(paginationInfo);
        getcategory(paginationInfo);
    };
    //
    const datefrom = (e) => {
        setstartdate(e.target.value);
    };
    const dateto = (e) => {
        setenddate(e.target.value);
    };
    //
    const deleteProduct = (id) => {
        deleteproduct(id).then((data) => {
            if (data.error) {
                console.log("----------->", data.error);
            } else {
                getproduc();
            }
        });
    };
    const deletecate = (id) => {
        deletecategory(id).then((data) => {
            if (data.error) {
                console.log("----------->", data.error);
            } else {
                getcategory();
            }
        });
    };

    //

    return (
        <div>
            <TableList
                handlePageClick={handlePageClick}
                onserach={onserach}
                deleteProduct={deleteProduct}
                setsort={sorting}
                paginationInfo={paginationInfo}
                deletecate={deletecate}
                categoryscomponent={categoryscomponent}
                products={productscomponent}
                category={category}
                productArr={product}
                sort_order={sort_order}
                datefilter={datefrom}
                dateto={dateto}
                start={startdate}
                end={enddate}
                getproduc={getproduc}
                getcategory={getcategory}
                pageCount={pageCount}
                sortingprice={sortingprice}
                sort_orderprice={sort_orderprice}
            />
        </div>
    );
};
export default Parent;
