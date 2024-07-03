import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { act } from "react-dom/test-utils"; // Import act from react-dom/test-utils

describe("Footer", () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Footer />);
    });
    expect(screen.getByText("© 2024 FOODIEDELIGHT")).toBeInTheDocument();
  });

  it("contains the correct text", () => {
    act(() => {
      render(<Footer />);
    });
    const footerText = screen.getByText("© 2024 FOODIEDELIGHT");
    expect(footerText).toBeInTheDocument();
  });

  it("has the correct CSS classes", () => {
    act(() => {
      render(<Footer />);
    });
    const footerElement = screen.getByText(
      "© 2024 FOODIEDELIGHT"
    ).parentElement;
    expect(footerElement).toHaveClass("bg-gray-800 p-4 text-white text-center");
  });
});
