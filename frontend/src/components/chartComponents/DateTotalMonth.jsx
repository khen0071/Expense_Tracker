/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Spinner from "../Spinner";

const DateTotalMonth = ({ expenseList, isLoading }) => {
  // Create an object to store the total price for each month
  const monthlyTotalPrice = {};

  // Iterate through the expenses
  expenseList?.map((expense) => {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // Get the short month name (e.g., Jan)

    const monthYearKey = `${month}`;

    if (!monthlyTotalPrice[monthYearKey]) {
      monthlyTotalPrice[monthYearKey] = 0;
    }

    monthlyTotalPrice[monthYearKey] += expense.price;
  });

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: [
          monthlyTotalPrice.Jan,
          monthlyTotalPrice.Feb,
          monthlyTotalPrice.Mar,
          monthlyTotalPrice.Apr,
          monthlyTotalPrice.May,
          monthlyTotalPrice.Jun,
          monthlyTotalPrice.Jul,
          monthlyTotalPrice.Aug,
          monthlyTotalPrice.Sep,
          monthlyTotalPrice.Oct,
          monthlyTotalPrice.Nov,
          monthlyTotalPrice.Dec,
        ],

        borderColor: "rgb(59,130,246)",
        borderWidth: 1,
      },
    ],
  };

  return <>{isLoading ? <Spinner /> : <Line data={data} />}</>;
};

export default DateTotalMonth;
