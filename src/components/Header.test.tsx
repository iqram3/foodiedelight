import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the header correctly", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText(/FOODIEDELIGHT/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /add restaurant/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  test("handles search input correctly", async () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(/search restaurants.../i);
    fireEvent.change(searchInput, { target: { value: "italian" } });

    fireEvent.submit(screen.getByRole("button", { name: /search/i }));

    // Use `await` with `waitFor` for async operations to resolve
    await screen.findByText(/FOODIEDELIGHT/i);

    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("?q=italian");
  });

  test("clears search input correctly", async () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(/search restaurants.../i);
    fireEvent.change(searchInput, { target: { value: "chinese" } });

    fireEvent.click(screen.getByRole("button", { name: /✕/i }));

    await screen.findByText(/FOODIEDELIGHT/i);

    expect(searchInput).toHaveValue("");
    expect(window.location.pathname).toBe("/");
  });
});
