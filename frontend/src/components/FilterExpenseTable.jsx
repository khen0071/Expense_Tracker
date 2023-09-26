/* eslint-disable react/prop-types */

const FilterExpenseTable = ({ expense }) => {
  return (
    <>
      <td>{expense.title}</td>
      <td>${expense.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

      <td>{expense.paidWith}</td>
      <td>{expense.paymentDetail}</td>
      <td>{expense.category}</td>
    </>
  );
};

export default FilterExpenseTable;
