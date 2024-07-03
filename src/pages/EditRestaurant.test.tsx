import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EditRestaurant from "./EditRestaurant";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("EditRestaurant", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders EditRestaurant component correctly", async () => {
    const mockRestaurant = {
      id: 1,
      name: "Test Restaurant",
      description: "Test Description",
      location: "Test Location",
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:id" element={<EditRestaurant />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Edit Restaurant")).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5000/restaurants/1"
    );
  });

  it("handles restaurant update successfully", async () => {
    const mockRestaurant = {
      id: 1,
      name: "Test Restaurant",
      description: "Test Description",
      location: "Test Location",
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });
    mockedAxios.put.mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:id" element={<EditRestaurant />} />
        </Routes>
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const locationInput = screen.getByLabelText("Location");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });
    fireEvent.change(locationInput, { target: { value: "Updated Location" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:5000/restaurants/1",
        {
          id: 1,
          name: "Updated Name",
          description: "Updated Description",
          location: "Updated Location",
        }
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Restaurant updated successfully"
      );
    });
  });
});
