import { useState } from "react";
import Spinner from "../components/Spinner";
import ExpenseTable from "./ExpenseTable";
import AddExpense from "./AddExpense";
import { useGetExpenseQuery } from "../features/api/expense/expenseSlice";
import { motion, AnimatePresence } from "framer-motion";
import CategoryChart from "./chartComponents/CategoryChart";
import DateChart from "./chartComponents/DateChart";
import PaymentPie from "./chartComponents/PaymentPie";
import Stats from "./Stats";
import DateTotalMonth from "./chartComponents/DateTotalMonth";
import Navbar from "./Navbar";
import FilteredCalendar from "./FilteredCalendar";
import "react-datepicker/dist/react-datepicker.css";

const itemsPerPage = 5;

const ExpenseList = () => {
  const { data: expenseList, isLoading, error } = useGetExpenseQuery();

  const [currentPage, setCurrentPage] = useState(1);
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
    <>
      <div className="">
        <Navbar />

        <div>
          <Stats expenseList={expenseList} />
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-3 mt-6">
            <div className="w-full bg-[#28272D] rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,1)] flex justify-center">
              <DateTotalMonth
                expenseList={expenseList}
                isLoading={isLoading}
                error={error}
              />
            </div>
            <div className="w-full bg-[#28272D] rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,1)]">
              <CategoryChart
                expenseList={expenseList}
                isLoading={isLoading}
                error={error}
              />
            </div>

            <div className="w-full bg-[#28272D] rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,1)]">
              <DateChart
                expenseList={expenseList}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>

          <div className="mt-6">
            <AddExpense />
          </div>
          <div className="flex flex-col-reverse lg:flex-row mt-6 lg:space-x-3">
            <div className="z-0 w-full mt-6 lg:mt-0">
              <div>
                {isLoading ? (
                  <Spinner />
                ) : error ? (
                  <div className="flex justify-center">
                    {/* {error?.data?.message || error.error} */}
                    <p className="pb-3 text-error font-semibold">
                      Failed to fetch API
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border-t lg:max-h-[440px] max-h-[560px] overflow-y-hidden">
                    {expenseList.length < 1 ? (
                      <p className="text-center my-6 italic font-semibold text-[16px] md:text-[16px] mx-2 text-warning">
                        Your expense list will show here. Please add your first
                        expense.
                      </p>
                    ) : (
                      <>
                        <div className="">
                          <table className="table table-pin-rows bg-[#28272D] table-pin-cols">
                            <thead className="uppercase">
                              <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Method</th>
                                <th>Payment Detail</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <AnimatePresence>
                                {currentExpenses?.map((expense) => (
                                  <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0 }}
                                    key={expense._id}
                                    className="text-[12px] capitalize">
                                    <ExpenseTable expense={expense} />
                                  </motion.tr>
                                ))}
                              </AnimatePresence>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              {currentExpenses?.length < 1 || error ? null : (
                <div className="flex justify-center items-center space-x-3 py-3 border-2 border-[#333] bg-[#28272D]">
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
                    disabled={currentPage === totalPages}
                    className="btn btn-info w-[100px]">
                    Next
                  </button>
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 bg-[#28272D] flex justify-center items-center rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,1)]">
              <PaymentPie
                expenseList={expenseList}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>

        <FilteredCalendar />
      </div>
    </>
  );
};

export default ExpenseList;
