import React from "react";

interface PaginationProps {
  currentPage: number;
  disablePrevious: boolean;
  disableNext: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { currentPage, disablePrevious, disableNext } = props;

  return (
    <div className="flex justify-between mt-10">
      <a
        href={"/articles?page=" + (currentPage - 1)}
        className={
          disablePrevious
            ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none"
            : "inline-block bg-maple-100 px-3 py-2 hover:bg-maple-600 hover:text-white rounded-lg"
        }
      >
        Previous
      </a>
      <a
        href={"/articles?page=" + (currentPage + 1)}
        className={
          disableNext
            ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none"
            : "inline-block bg-maple-100 px-3 py-2 hover:bg-maple-600 hover:text-white rounded-lg"
        }
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;
