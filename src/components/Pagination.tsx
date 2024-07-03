import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisibleButtons = 3;

  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxVisibleButtons / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex flex-col items-center mt-4 sm:flex-row sm:justify-center">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className={`px-3 py-1 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded text-sm sm:text-base`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {startPage > 1 && (
          <button
            key={1}
            onClick={() => goToPage(1)}
            className={`px-3 py-1 ${
              currentPage === 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-blue-600 text-gray-700"
            } rounded text-sm sm:text-base`}
          >
            1
          </button>
        )}
        {startPage > 2 && <span className="mx-1">...</span>}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => goToPage(startPage + index)}
            className={`px-3 py-1 ${
              currentPage === startPage + index
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 hover:bg-blue-600 text-gray-700"
            } rounded text-sm sm:text-base`}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPages - 1 && <span className="mx-1">...</span>}
        {endPage < totalPages && (
          <button
            key={totalPages}
            onClick={() => goToPage(totalPages)}
            className={`px-3 py-1 ${
              currentPage === totalPages
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 hover:bg-blue-600 text-gray-700"
            } rounded text-sm sm:text-base`}
          >
            {totalPages}
          </button>
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className={`px-3 py-1 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded text-sm sm:text-base`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
