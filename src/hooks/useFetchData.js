import { useState, useEffect } from "react";

export const useFetchData = (state, dispatch) => {
    const limit = 6;
    const [data, setData] = useState([]);
    const [skipValue, setSkipValue] = useState(state.skip);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
       setLoading(true);
       fetch("../assets/data.json").then(res=>res.json()).then(res=>{
       
            //filter
            res = res.filter((el)=>el.price >= state.filter.price[0] && el.price <= state.filter.price[1]);

            if (state.filter.category !== "All") {
                res = res.filter((el)=>el.category === state.filter.category);
            }

            if (state.filter.brand) {
                res = res.filter((el)=>el.brand.toLowerCase().includes(state.filter.brand.toLowerCase()));
            }

            // sort
            Object.entries(state.sort).forEach(([key, value])=> {
                res.sort((a, b) => value === "a-z" ? a[key]-b[key] : b[key]-a[key]);
            })

            localStorage.setItem("filter", JSON.stringify(state));

            if (state.skip !== skipValue) {
                setSkipValue(state.skip);
                setData([...data, ...res.slice(state.skip, limit+state.skip)]);

            } else {
                setSkipValue(0);
                setData(res.slice(0, limit));
            }

            setLoading(false);
        });
    }, [state, state.skip]);

    return {loading, data};
}