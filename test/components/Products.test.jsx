import { it, describe, expect } from "vitest";
import { render, screen, renderHook, waitFor} from "@testing-library/react";
import { Products } from "../../src/components/Products";
import "@testing-library/jest-dom/vitest";
import { useFetchData } from "../../src/hooks/useFetchData";



describe("Test Products", () => {
   it("Test loading text", async () => {
      render(<Products data={[]} loading={true} />)

      const loading = screen.getByText("loading...");
      expect(loading).toBeInTheDocument();
   })

   it("Test No Products Found text", async () => {
      render(<Products data={[]} loading={false} />)
      screen.debug()
      const elem = screen.getByText("No Products Found");
      expect(elem).toBeInTheDocument();
   })

   it("Products rendering", async () => {
      const {result} = renderHook(()=>useFetchData({
         sort: {
            price: "z-a", 
         }, 
         filter: {
            price: [0, 1000],
            category: "All",
            brand: ""
         },
         skip: 0
      }))

      await waitFor(() => {
         expect(result.current.data).toBeDefined();
         expect(result.current.data.length).toBeGreaterThan(0);
      });

      console.log("result", result)

      render(<Products data={result.current.data} loading={false} />);

      expect(screen.getAllByTestId("product")).toHaveLength(6);

      result.current.data.forEach((product)=>{
         expect(screen.getByText(product.brand)).toBeInTheDocument();
      })

      screen.debug()
   
   })
})
