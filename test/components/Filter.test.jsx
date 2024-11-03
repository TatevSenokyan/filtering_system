import { Filter } from "../../src/components/Filter";
import { ReducerState } from "../../src/store/stateReducer";
import { it, describe, expect } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Filter", () => {
 
    it("Test Filter component rendering with inital values", async ()=>{
        const { result } = renderHook(()=>ReducerState());
        render(<Filter state={result.current.state}/>);

        const elem = screen.getByAltText("filter");
        expect(elem).toBeInTheDocument();

        const user = userEvent.setup();

        await user.click(elem);
        const items = ["brand", "from", "to", "category", "price", "rating"];

        items.forEach(item => {
            const elem = screen.getByTestId(item);
            expect(elem).toBeInTheDocument();

            if (item === "category" || item === "brand") expect(elem.value).toBe(result.current.state.filter[item]);
            if (item === "price" || item === "rating") expect(elem.value).toBe(result.current.state.sort[item] || "a-z");
            if (item === "to" || item === "from") expect(elem.value).
                toBe(String(result.current.state.filter.price[item === "from" ? 0 : 1]));    
        });

    })


    it("Test values changing events", async ()=> {
        const items = ["brand", "from", "to", "category", "price", "rating"];
        const user = userEvent.setup();
        
        for (let i=0; i<items.length; i++) {
            const elem = screen.getByTestId(items[i]);

            if (items[i] === "brand") {
                await user.type(elem, "ol");
                expect(elem.value).toBe("ol");
            }

            if (items[i] === "from" || items[i] === "to") {
                await user.clear(elem);
                await user.type(elem, "100");
                expect(elem.value).toBe("100");
            }

            if (items[i] === "category") {
                await user.selectOptions(elem, "Clothing");
                expect(elem.value).toBe("Clothing");
            }

            if (items[i] === "rating" || items[i] === "price") {
                await user.selectOptions(elem, "z-a");
                expect(elem.value).toBe("z-a");
            }
        }
    })
})



