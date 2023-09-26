/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGetExpenseQuery } from "../features/api/expense/expenseSlice";

const itemsPerPage = 5; //
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: expenseList } = useGetExpenseQuery();

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the todos to display only the items for the current page
  const currentExpenses = expenseList?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(expenseList?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <ul>
        {currentExpenses?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
