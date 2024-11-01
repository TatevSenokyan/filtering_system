import { useState, useRef } from "react";

export const useInputValue = (initialState, handleChange, min, max) => {
    const [value, setValue] = useState(initialState);

    const debounceIdRef = useRef(null);

    const onChange = (e) => {
        if (min !== undefined && e.target.value<min) return;
        if (max !== undefined && e.target.value>max) return; 
        setValue(e.target.value);
        if (debounceIdRef.current) clearTimeout(debounceIdRef.current);
        debounceIdRef.current = setTimeout(()=>handleChange(e.target.value), 1000);
    }

    return {
        value,
        onChange
    }
}