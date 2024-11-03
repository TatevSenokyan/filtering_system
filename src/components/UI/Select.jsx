
import { useInputValue } from "../../hooks/useInputValue";

export const Select = ({initialValue, options, handleChange, title}) => {
    const value = useInputValue(initialValue, handleChange);
  
    return (
        <>
            <label>{title}</label>
            <select
               data-testid={title}
               {...value}
            >
                {
                    options.map(item=><option key={item}>{item}</option>)
                }

            </select>
        </>

    )
}