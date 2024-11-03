import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { App } from "../src/routes/App";


describe("test", () => {
    it("test App component rendering", async ()=>{
        const { container } = render(<App />);
        const elements = container.getElementsByClassName("layout");
        
        expect(elements.length).toBeGreaterThan(0);
    })
})