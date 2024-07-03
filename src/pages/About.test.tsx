import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About Component", () => {
  it("renders About component correctly", () => {
    act(() => {
      render(<About />);
    });

    const headingElement = screen.getByText("About FOODIEDELIGHT");
    expect(headingElement).toBeInTheDocument();
  });
});
