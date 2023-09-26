/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Spinner from "../Spinner";

const LineChart = ({ expenseList, isLoading }) => {
  //Comment
  const dateString = expenseList?.map((item) => item.date?.substring(4, 7));

  const countMonths = (dateString, monthToCount) => {
    return dateString?.reduce((count, obj) => {
      if (obj === monthToCount) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const janCount = countMonths(dateString, "Jan");
  const febCount = countMonths(dateString, "Feb");
  const marCount = countMonths(dateString, "Mar");
  const aprCount = countMonths(dateString, "Apr");
  const mayCount = countMonths(dateString, "May");
  const junCount = countMonths(dateString, "Jun");
  const julCount = countMonths(dateString, "Jul");
  const augCount = countMonths(dateString, "Aug");
  const sepCount = countMonths(dateString, "Sep");
  const octCount = countMonths(dateString, "Oct");
  const novCount = countMonths(dateString, "Nov");
  const decCount = countMonths(dateString, "Dec");

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
        label: "Monthly Activities",
        data: [
          janCount,
          febCount,
          marCount,
          aprCount,
          mayCount,
          junCount,
          julCount,
          augCount,
          sepCount,
          octCount,
          novCount,
          decCount,
        ],

        borderColor: " rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <>{isLoading ? <Spinner /> : <Line data={data} />}</>;
};

export default LineChart;
