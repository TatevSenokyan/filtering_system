
import { useState } from "react";
import { Input } from "./UI/Input";
import { Select } from "./UI/Select";

export const Filter = ({handleChange, state}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="filter">
            <img 
               alt="filter"
               src="/images/filter.svg"
               onClick={()=>setOpen(!open)} 
            />
            {open && <div>
                <Input
                    title={"brand"}
                    initialValue={state.filter.brand}
                    handleChange={(val)=>handleChange("brand", val)} 
                    placeholder={"brand"}
                    type={"text"}
                />
                <Select 
                   title={"category"}
                   initialValue={state.filter.category} 
                   handleChange={(val)=>handleChange("category", val)}
                   options={["All", "Clothing", "Electronics", "Footwear"]} 
                />
                <Select 
                   title={"price"}
                   initialValue={state.sort.price} 
                   handleChange={(val)=>handleChange("price", val)}
                   options={["a-z", "z-a"]} 
                />
                <Select 
                   title={"rating"}
                   initialValue={state.sort.rating} 
                   handleChange={(val)=>handleChange("rating", val)}
                   options={["a-z", "z-a"]} 
                />
                <div>
                    <Input
                       initialValue={state.filter.price[0]}
                       placeholder={"from"}
                       max={state.filter.price[1]}
                       type={"number"}
                       handleChange={(val)=>handleChange("minPrice", val)}
                    />
                    <Input
                        initialValue={state.filter.price[1]}
                        min={state.filter.price[0]}
                        placeholder={"to"}
                        type={"number"}
                        handleChange={(val)=>handleChange("maxPrice", val)}
                    />
                </div>
            </div>}
        </div>
    )
}