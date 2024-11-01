import { useReducer } from "react";
// filter---category, price range, brand
// sort---rating, price, 
export const initialState = {
    sort: {
        price: "z-a", 
    }, 
    filter: {
        price: [0, 1000],
        category: "All",
        brand: ""
    },
    skip: 0
}
export const reducer = (state, action) => {
    switch(action.type) {
        case "price":
        case "rating":
            return {
                ...state,
                sort: {
                    [action.type]: action.payload.value
                }
            }
            break;
        case "category":
        case "brand":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.type]: action.payload.value
                }
            }
            break;
        case "minPrice": 
            return {
                ...state,
                filter: {
                    ...state.filter,
                    price: [action.payload.value, state.filter.price[1]]
                }
            }
            break;
        case "maxPrice": 
            return {
                ...state,
                filter: {
                    ...state.filter,
                    price: [state.filter.price[0], action.payload.value]
                }
            }
            break;
        case "skip":
            return {
                ...state,
                skip: action.payload ? 0 : state.skip+6
            }
            break;

    }
}

export const ReducerState = () => {
    const filter = JSON.parse(localStorage.getItem("filter"));

    const [state, dispatch] = useReducer(reducer, filter ? {...filter, skip: 0} : initialState);

    return {state, dispatch};
}