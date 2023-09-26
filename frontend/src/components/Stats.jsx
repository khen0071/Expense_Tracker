/* eslint-disable react/prop-types */

const Stats = ({ expenseList }) => {
  const categorySums = expenseList?.reduce((accumulator, expense) => {
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

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full gap-3">
      <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
        <i className="fa-solid fa-sack-dollar text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-blue-500"></i>
        <div className="flex flex-col items-start">
          <p className="text-[12px] font-semibold text-gray-500">
            Total Expense:
          </p>

          {!totalExpense ? (
            <p className="text-[20px] font-bold">No Data Yet</p>
          ) : (
            <p className="text-[20px] font-bold">
              ${totalExpense.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
        <i className="fa-solid fa-money-bill-wave text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-green-500"></i>
        <div className="flex flex-col items-start">
          <p className="text-[12px] font-semibold text-gray-500">
            Cash Expense:
          </p>
          {!cashTotal ? (
            <p className="text-[20px] font-bold">No Data Yet</p>
          ) : (
            <p className="text-[20px] font-bold">
              ${cashTotal.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
        <i className="fa-regular fa-credit-card text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-yellow-500"></i>
        <div className="flex flex-col items-start">
          <p className="text-[12px] font-semibold text-gray-500">
            Debit Expense:
          </p>
          {!debitTotal ? (
            <p className="text-[20px] font-bold">No Data Yet</p>
          ) : (
            <p className="text-[20px] font-bold">
              ${debitTotal.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full text-center bg-[#28272D] shadow-[0_3px_10px_rgb(0,0,0,1)] space-x-3 py-6 rounded-md">
        <i className="fa-brands fa-cc-visa text-[20px] w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-orange-500"></i>
        <div className="flex flex-col items-start">
          <p className="text-[12px] font-semibold text-gray-500">
            Credit Expense:
          </p>
          {!creditTotal ? (
            <p className="text-[20px] font-bold">No Data Yet</p>
          ) : (
            <p className="text-[20px] font-bold">
              ${creditTotal.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
