import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// Mock components
jest.mock("./components/Header", () => () => <div>Mock Header</div>);
jest.mock("./components/Footer", () => () => <div>Mock Footer</div>);
jest.mock("./components/RestaurantDetail", () => () => (
  <div>Mock Restaurant Detail</div>
));
jest.mock("./pages/Home", () => () => <div>Mock Home</div>);
jest.mock("./pages/About", () => () => <div>Mock About</div>);
jest.mock("./pages/AddRestaurant", () => () => <div>Mock Add Restaurant</div>);
jest.mock("./pages/EditRestaurant", () => () => (
  <div>Mock Edit Restaurant</div>
));
jest.mock("./pages/PageNotFound", () => () => <div>Mock Page Not Found</div>);

describe("App component", () => {
  test("renders Home page on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Home")).toBeInTheDocument();
  });

  test("renders About page on /about route", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock About")).toBeInTheDocument();
  });

  test("renders Add Restaurant page on /add route", () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Add Restaurant")).toBeInTheDocument();
  });

  test("renders Restaurant Detail page on /restaurant/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/restaurant/1"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Restaurant Detail")).toBeInTheDocument();
  });

  test("renders Edit Restaurant page on /restaurant/:id/edit route", () => {
    render(
      <MemoryRouter initialEntries={["/restaurant/1/edit"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Edit Restaurant")).toBeInTheDocument();
  });

  test("renders Page Not Found on unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/some/unknown/path"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Page Not Found")).toBeInTheDocument();
  });
});
