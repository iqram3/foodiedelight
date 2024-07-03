import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import RestaurantList from "./RestaurantList";

// Mock Axios for testing
jest.mock("axios");

describe("RestaurantList component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<RestaurantList searchQuery="" />);
    expect(screen.getByText("Restaurants Loading...")).toBeInTheDocument();
  });

  it('renders "No restaurants available." when no restaurants are fetched', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    render(<RestaurantList searchQuery="" />);

    await waitFor(() => {
      expect(screen.getByText("No restaurants available.")).toBeInTheDocument();
    });
  });

  it("renders error message when fetching restaurants fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );
    render(<RestaurantList searchQuery="" />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load restaurants.")
      ).toBeInTheDocument();
    });
  });

  it("renders filtered restaurants based on search query", async () => {
    const mockRestaurants = [
      { id: 1, name: "Restaurant A" },
      { id: 2, name: "Restaurant B" },
      { id: 3, name: "Restaurant C" },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRestaurants });

    render(<RestaurantList searchQuery="restaurant" />);

    await waitFor(() => {
      expect(screen.getByText("Restaurant A")).toBeInTheDocument();
      expect(screen.getByText("Restaurant B")).toBeInTheDocument();
      expect(screen.getByText("Restaurant C")).toBeInTheDocument();
    });
  });

  it("deletes a restaurant correctly", async () => {
    const mockRestaurants = [
      { id: 1, name: "Restaurant A" },
      { id: 2, name: "Restaurant B" },
      { id: 3, name: "Restaurant C" },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRestaurants });

    render(<RestaurantList searchQuery="" />);

    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Restaurant A")).not.toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    const mockRestaurants = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name: `Restaurant ${index + 1}`,
    }));

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockRestaurants });

    render(<RestaurantList searchQuery="" />);

    await waitFor(() => {
      expect(screen.getByText("Restaurant 1")).toBeInTheDocument();
      expect(screen.queryByText("Restaurant 7")).not.toBeInTheDocument();
    });

    const nextPageButton = screen.getByText("Next");
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.queryByText("Restaurant 1")).not.toBeInTheDocument();
      expect(screen.getByText("Restaurant 7")).toBeInTheDocument();
    });
  });
});
