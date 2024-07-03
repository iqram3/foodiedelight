import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Home from "./Home";

describe("Home component", () => {
  it("renders RestaurantList without search query", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Restaurants Loading...")).toBeInTheDocument();
  });

  it("renders RestaurantList with search query", () => {
    render(
      <MemoryRouter initialEntries={["/?q=burger"]}>
        <Route path="/" element={<Home />} />
      </MemoryRouter>
    );
    expect(screen.getByText("Restaurants Loading...")).toBeInTheDocument();
  });

  it('renders "No restaurants available." message when no restaurants are present', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("No restaurants available.")).toBeInTheDocument();
  });

  it("renders error message when data fetch fails", () => {
    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.reject(new Error("Failed to fetch"))),
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Failed to load restaurants.")).toBeInTheDocument();
  });
});
