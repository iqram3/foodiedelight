import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RestaurantDetail from "../components/RestaurantDetail";
import axios from "axios";
import { toast } from "react-toastify";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockRestaurant = {
  name: "Test Restaurant",
  description: "Test Description",
  location: "Test Location",
};

describe("RestaurantDetail", () => {
  it("displays loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <Routes>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches and displays restaurant details", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRestaurant });

    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <Routes>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Restaurant Details")).toBeInTheDocument();
    });

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.description)).toBeInTheDocument();
    expect(screen.getByText("Location:")).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.location)).toBeInTheDocument();
  });

  it("handles API failure and displays an error message", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <Routes>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to load restaurant details"
      );
    });
  });

  it("navigates back to the home page on back button click", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <Routes>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Back"));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("navigates to the edit page on edit button click", () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRestaurant });

    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <Routes>
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Edit")).toHaveAttribute(
      "href",
      "/restaurant/1/edit"
    );
  });
});
