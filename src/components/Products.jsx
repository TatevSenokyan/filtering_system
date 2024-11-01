
import React, { useRef } from "react";
import { useScrollPagination } from "../hooks/useScrollPagination";
import { Product } from "./UI/Product";

export const Products = ({data, loading, handleSkip}) => {
    const tableContainerRef = useRef(null);

    const loadMoreData = () => handleSkip();
    
    useScrollPagination(tableContainerRef, loadMoreData);

    return (
        <div className="products" ref={tableContainerRef}>
            {loading ? <p>loading...</p> : 
                data.length ? data.map(el=><Product key={el.id} data={el} />) : <p>No Products Found</p>
            }  
        </div>
    )
}