import { useFetchData } from "../hooks/useFetchData";
import { Filter } from "../components/Filter";
import { Products } from "../components/Products";
import { ReducerState } from "../store/stateReducer";

export const App = () => {
    const { state, dispatch } = ReducerState();
    const { loading, data } = useFetchData(state); 
    
    const handleChange = (field, value) => dispatch({type: field, payload: {value}});
    
    return (
        <div className="layout">
            <Filter 
               handleChange={handleChange} 
               state={state} 
            />
            <Products 
               data={data} 
               loading={loading} 
               handleSkip={()=>!loading && dispatch({type: "skip"})} 
            />
        </div>
    )
}