/* eslint-disable react/prop-types */

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Spinner from "../Spinner";

const PieChart = ({ expenseList, isLoading }) => {
  const categorySums = expenseList?.reduce((accumulator, expense) => {
    if (!accumulator[expense.category]) {
      accumulator[expense.category] = 0;
    }
    accumulator[expense.category] += expense.price;
    return accumulator;
  }, {});

  const personalTotal = Number(categorySums?.personal);
  const foodTotal = Number(categorySums?.food);
  const transportationTotal = Number(categorySums?.transportation);
  const healthTotal = Number(categorySums?.health);
  const housingTotal = Number(categorySums?.housing);
  const entertainmentTotal = Number(categorySums?.entertainment);

  // const foodCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "food") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const personalCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "personal") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const transportationCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "transportation") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const healthCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "health") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const housingCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "housing") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  // const entertainmentCount = expenseList?.reduce((count, obj) => {
  //   if (obj.category == "entertainment") {
  //     return count + 1;
  //   }
  //   return count;
  // }, 0);

  const data = {
    labels: [
      "Personal",
      "Food",
      "Transportation",
      "Health",
      "Housing",
      "Entertainment",
    ],
    datasets: [
      {
        label: "Categories",
        data: [
          personalTotal,
          foodTotal,
          transportationTotal,
          healthTotal,
          housingTotal,
          entertainmentTotal,
        ],
        backgroundColor: [
          "rgba(6, 182, 212, 0.2)",
          "rgba(34, 197, 94, 0.2)",
          "rgba(249, 115, 22, 0.2)",
          "rgba(234, 179, 8, 0.2)",
          "rgba(217, 70, 239, 0.2)",
          "rgba(244, 63, 94, 0.2)",
        ],
        borderColor: [
          "rgb(6, 182, 212, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(217, 70, 239, 1)",
          "rgba(244, 63, 94, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Bar data={data} options={{ indexAxis: "y" }} />
      )}
    </>
  );
};

export default PieChart;
