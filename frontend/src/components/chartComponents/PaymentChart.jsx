/* eslint-disable react/prop-types */

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Spinner from "../Spinner";

const BarChart = ({ expenseList, isLoading }) => {
  const categorySums = expenseList?.reduce((accumulator, expense) => {
    if (!accumulator[expense.paidWith]) {
      accumulator[expense.paidWith] = 0;
    }
    accumulator[expense.paidWith] += expense.price;
    return accumulator;
  }, {});

  const cashTotal = Number(categorySums?.cash);
  const debitTotal = Number(categorySums?.debit);
  const creditTotal = Number(categorySums?.credit);

  // const cashCount = expenseList?.reduce((count, obj) => {
  //   if (obj.paidWith == "cash") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const debitCount = expenseList?.reduce((count, obj) => {
  //   if (obj.paidWith == "debit") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const creditCount = expenseList?.reduce((count, obj) => {
  //   if (obj.paidWith == "credit") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  const data = {
    labels: ["Cash", "Debit", "Credit"],
    datasets: [
      {
        axis: "y",
        label: "Payment Type",
        data: [cashTotal, debitTotal, creditTotal],
        borderColor: "rgba(249, 115, 22, 1)",
      },
    ],
  };

  return <>{isLoading ? <Spinner /> : <Line data={data} />}</>;
};

export default BarChart;
