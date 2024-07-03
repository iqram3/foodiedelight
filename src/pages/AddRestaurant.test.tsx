import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddRestaurant from "./AddRestaurant";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AddRestaurant", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders AddRestaurant component correctly", () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<AddRestaurant />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Add Restaurant")).toBeInTheDocument();
  });

  it("handles restaurant addition successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<AddRestaurant />} />
        </Routes>
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const locationInput = screen.getByLabelText("Location");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.change(locationInput, { target: { value: "Test Location" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:5000/restaurants",
        {
          name: "Test Name",
          description: "Test Description",
          location: "Test Location",
        }
      );
      expect(toast.success).toHaveBeenCalledWith("Restaurant added");
    });
  });
});
