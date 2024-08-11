import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {page > 1 && (
        <button className="btn" onClick={() => setPage(page - 1)}>
          <GoArrowLeft size={18} />
          Previous
        </button>
      )}

      {page < totalPages && (
        <button className="btn" onClick={() => setPage(page + 1)}>
          Next
          <GoArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
