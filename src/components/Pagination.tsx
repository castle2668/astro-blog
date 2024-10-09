import React from "react";

interface Props {
  currentPage: number;
  disablePrevious: boolean;
  disableNext: boolean;
}

const Pagination: React.FC<Props> = (props) => {
  const { currentPage, disablePrevious, disableNext } = props;

  return (
    <div className="flex justify-between mt-10">
      <a
        href={"/articles?page=" + (currentPage - 1)}
        className={
          disablePrevious
            ? "inline-block bg-maple-100 px-3 py-2 rounded-lg pointer-events-none"
            : "inline-block bg-maple-500 px-3 py-2 hover:bg-maple-600 rounded-lg"
        }
      >
        Previous
      </a>
      <a
        href={"/articles?page=" + (currentPage + 1)}
        className={
          disableNext
            ? "inline-block bg-maple-100 px-3 py-2 rounded-lg pointer-events-none"
            : "inline-block bg-maple-500 px-3 py-2 hover:bg-maple-600 rounded-lg"
        }
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;
