import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import { useGetExpenseQuery } from "../features/api/expense/expenseSlice";
import FilterExpenseTable from "./FilterExpenseTable";
import FilteredBar from "./chartComponents/FilteredBar";

const itemsPerPage = 4;

const FilteredCalendar = () => {
  const { data: expenseList, isLoading, error } = useGetExpenseQuery();
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(!isOpen);
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const filteredData = expenseList?.filter((item) => {
    if (!selectedDate) return false; // No date selected, return all items
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === selectedDate.toDateString();
  });

  const categorySums = filteredData?.reduce((accumulator, expense) => {
    if (!accumulator[expense.paidWith]) {
      accumulator[expense.paidWith] = 0;
    }
    accumulator[expense.paidWith] += expense.price;
    return accumulator;
  }, {});

  const cashTotal = Number(categorySums?.cash) || 0;
  const debitTotal = Number(categorySums?.debit) || 0;
  const creditTotal = Number(categorySums?.credit) || 0;
  const totalExpense = Number(cashTotal + debitTotal + creditTotal) || 0;

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the todos to display only the items for the current page
  const currentExpenses = filteredData?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row my-6 lg:space-x-3 ">
        <div className="w-full min-h-[320px]">
          <div className="w-full md:flex-row flex-col space-y-3 md:space-y-0 flex justify-between items-center space-x-3 p-6 border-[#333]  bg-[#28272D]">
            <div className="flex space-x-3 items-center">
              <button
                className="btn btn-outline btn-success"
                onClick={handleClick}>
                Select Date
              </button>
              {selectedDate ? (
                <p className="italic text-gray-500 text-[14px]">
                  {selectedDate.toDateString()}
                </p>
              ) : (
                <p className="italic text-gray-500 text-[14px]">
                  Filter your expense via date.
                </p>
              )}
            </div>

            {currentExpenses?.length < 1 || error ? null : (
              <div className="flex justify-center items-center space-x-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-info w-[100px]">
                  Previous
                </button>
                <span>
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="btn btn-info w-[100px]">
                  Next
                </button>
              </div>
            )}
          </div>
          {isOpen && (
            <div className="absolute z-10">
              <DatePicker
                dateFormat="MMMM d, yyyy"
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select Date Here"
                inline
              />
            </div>
          )}

          {currentExpenses?.length < 1 ? (
            <span className="flex items-center justify-center text-center  italic font-semibold text-[16px] md:text-[16px] mx-2 text-warning min-h-[222px] ">
              No expense on this date.
            </span>
          ) : (
            <>
              <div className="overflow-x-auto border-t max-h-[222px] border-2 border-[#333]  overflow-y-hidden bg-[#28272D]">
                <table className="table table-pin-rows bg-[#28272D] table-pin-cols">
                  <thead className="uppercase">
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Method</th>
                      <th>Payment Detail</th>
                      <th>Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {currentExpenses?.map((expense) => (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          exit={{ opacity: 0 }}
                          key={expense._id}
                          className="text-[12px] capitalize">
                          <FilterExpenseTable expense={expense} />
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="w-full flex justify-center items-center lg:w-1/2 space-y-3 mt-6 md:mt-0 bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] rounded-md p-4 ">
          <FilteredBar currentExpenses={currentExpenses} />
        </div>
      </div>
      <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-3 mt-3">
        <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
          <i className="fa-solid fa-sack-dollar text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-blue-500"></i>
          <div className="flex flex-col items-start">
            <p className="text-[12px] font-semibold text-gray-500">
              Total Expense:
            </p>

            {!totalExpense ? (
              <p className="text-[14px] font-bold">No Data Yet</p>
            ) : (
              <p className="text-[14px] font-bold">
                ${totalExpense.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
          <i className="fa-solid fa-money-bill-wave text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-green-500"></i>
          <div className="flex flex-col items-start">
            <p className="text-[12px] font-semibold text-gray-500">
              Total Cash Expense:
            </p>
            {!cashTotal ? (
              <p className="text-[14px] font-bold">No Cash Payment</p>
            ) : (
              <p className="text-[14px] font-bold">
                ${cashTotal.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
          <i className="fa-regular fa-credit-card text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-yellow-500"></i>
          <div className="flex flex-col items-start">
            <p className="text-[12px] font-semibold text-gray-500">
              Total Debit Expense:
            </p>
            {!debitTotal ? (
              <p className="text-[14px] font-bold">No Debit Payment</p>
            ) : (
              <p className="text-[14px] font-bold">
                ${debitTotal.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
          <i className="fa-brands fa-cc-visa text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-orange-500"></i>
          <div className="flex flex-col items-start">
            <p className="text-[12px] font-semibold text-gray-500">
              Total Credit Expense:
            </p>
            {!creditTotal ? (
              <p className="text-[14px] font-bold">No Credit Payment</p>
            ) : (
              <p className="text-[14px] font-bold">
                ${creditTotal.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredCalendar;
