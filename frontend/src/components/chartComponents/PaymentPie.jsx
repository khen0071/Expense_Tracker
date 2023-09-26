/* eslint-disable react/prop-types */

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Spinner from "../Spinner";

const PaymentPie = ({ expenseList, isLoading }) => {
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
        backgroundColor: [
          "rgb(34,197,94, 0.5)",
          "rgb(234,179,8,0.5)",
          "rgb(249,115,22,0.5)",
        ],
        borderColor: [
          "rgb(34,197,94, 1)",
          "rgb(234,179,8,1)",
          "rgb(249,115,22,1)",
        ],
      },
    ],
  };

  return <>{isLoading ? <Spinner /> : <Doughnut data={data} />}</>;
};

export default PaymentPie;
