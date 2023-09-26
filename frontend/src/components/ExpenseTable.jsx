/* eslint-disable react/prop-types */
import { useDeleteExpenseMutation } from "../features/api/expense/expenseSlice";

const ExpenseTable = ({ expense }) => {
  const [deleteExpense] = useDeleteExpenseMutation();
  return (
    <>
      <td>{expense.title}</td>
      <td>${expense.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

      <td>{expense.paidWith}</td>
      <td>{expense.paymentDetail}</td>
      <td>{expense.category}</td>
      <td>{expense.date.substring(0, 15)}</td>
      <td>
        <button
          onClick={() => deleteExpense({ id: expense._id })}
          className="btn  text-[12px] btn-error my-1">
          Delete
        </button>
      </td>
    </>
  );
};

export default ExpenseTable;
