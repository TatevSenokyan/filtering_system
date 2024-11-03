import { Filter } from "../../src/components/Filter";
import { Products } from "../../src/components/Products";
import { it, describe, expect } from "vitest";
import { render, screen, renderHook, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { ReducerState } from "../../src/store/stateReducer";
import { useFetchData } from "../../src/hooks/useFetchData";


const ProductList = ({state, data}) => {
    return (
        <> 
            <Filter state={state} />
            <Products data={data} loading={false}/>
        </>
    )
}

describe("Test Products and Filter", () => {
    it ("ProductList test", async () => {
        const { result: stateResult } = renderHook(()=>ReducerState());
        const {result: dataResult} = renderHook(()=>useFetchData(stateResult.current.state));

        await waitFor(() => {
            expect(dataResult.current.data).toBeDefined();
         });
        
        render(<ProductList state={stateResult.current.state} data={dataResult.current.data} />)
        
        const user = userEvent.setup();

        const elem = screen.getByAltText("filter");
        await user.click(elem);

        act(() => {
            stateResult.current.dispatch({ type: "category", payload: { value: "Clothing" } });
            stateResult.current.dispatch({ type: "brand", payload: { value: "brand" } });
            stateResult.current.dispatch({ type: "minPrice", payload: { value: 100 } });
            stateResult.current.dispatch({ type: "maxPrice", payload: { value: 200 } });
            stateResult.current.dispatch({ type: "price", payload: { value: "z-a" } });
        });
    
        const {result: newDataResult} = renderHook(()=>useFetchData(stateResult.current.state));

        await waitFor(() => {
            expect(newDataResult.current.data).toBeDefined();
        });

        render(<ProductList state={stateResult.current.state} data={newDataResult.current.data} />)

        const products = screen.getAllByTestId("product");

        products.forEach((product, index) => {
            expect(product).toHaveTextContent("Clothing");
            expect(product).toHaveTextContent(/brand/i);

            const priceText = screen.getByText(`$ ${newDataResult.current.data[index].price}`);
            const priceValue = parseFloat(priceText.textContent.replace(/[^0-9.-]+/g, ""));
            expect(priceValue).toBeGreaterThan(100);
            expect(priceValue).toBeLessThan(200);


            //z-a case
            expect(newDataResult.current.data[index].price).toBeGreaterThan(newDataResult.current.data[index+1]?.price || 0);

            //a-z case
            //expect(newDataResult.current.data[index].price).toBeLessThan(newDataResult.current.data[index+1]?.price || Infinity);
        })

        screen.debug();
 
    })
})