import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("renders without crashing", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables the Previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
    expect(previousButton).toHaveClass("bg-gray-300 cursor-not-allowed");
  });

  it("disables the Next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass("bg-gray-300 cursor-not-allowed");
  });

  it("calls onPageChange with correct page number when Previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with correct page number when Next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it("displays the correct page numbers", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onPageChange with correct page number when a page button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it("does not show ellipsis when there are no pages to skip", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("shows ellipsis when there are pages to skip", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.queryByText("...")).toBeInTheDocument();
  });

  it("shows correct number of visible page buttons", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("handles boundary cases correctly", () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    rerender(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
