import React, { act } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RestaurantForm from "./RestaurantForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

describe("RestaurantForm", () => {
  const setup = (initialData = {}) => {
    const handleSubmit = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RestaurantForm
                  initialData={initialData}
                  onSubmit={handleSubmit}
                />
                <ToastContainer />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    return {
      handleSubmit,
    };
  };

  it("renders form fields correctly", () => {
    setup();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
  });

  it("displays validation error on invalid data submission", async () => {
    const { handleSubmit } = setup();
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(
      () => {
        expect(
          screen.getByText((content, element) => {
            return /name is required/i.test(content);
          })
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const formData = {
      name: "Test Name",
      description: "Test Description",
      location: "Test Location",
    };
    const { handleSubmit } = setup();
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: formData.name },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: formData.description },
      });
      fireEvent.change(screen.getByLabelText("Location"), {
        target: { value: formData.location },
      });
      fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    });
    expect(handleSubmit).toHaveBeenCalledWith(formData);
  });
});
