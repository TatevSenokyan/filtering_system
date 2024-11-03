
import { useInputValue } from "../../hooks/useInputValue";

export const Input = ({
  initialValue, 
  handleChange, 
  placeholder, 
  type, 
  title,
  min,
  max
}) => {
     const value = useInputValue(initialValue, handleChange, min, max);

     return (
      <>
         {title && <label>{title}</label>}
         <input 
            {...value}
            data-testid={title || placeholder}
            placeholder={placeholder}
            type={type}
          />
      </>

     )
}