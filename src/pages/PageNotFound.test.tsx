import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound";

describe("PageNotFound Component", () => {
  it("renders PageNotFound component correctly", () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    const headingElement = screen.getByText("Page Not Found");
    expect(headingElement).toBeInTheDocument();

    const paragraphElement = screen.getByText(
      "The page you are looking for does not exist."
    );
    expect(paragraphElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: /go back to home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
