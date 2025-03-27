import { Chart } from "chart.js/auto";
import { reportChart } from "./elements";

let chart = null;

export const clearChart = () => {
  reportChart.textContent = "";
};

export const createChart = (data) => {
  const incomeData = data.filter((item) => item.type === "income");
  const expensesData = data.filter((item) => item.type === "expenses");

  const chartLabels = [...new Set(data.map((item) => item.date))];

  const reduceOperationInDate = (arrData) => {
    return chartLabels.reduce((acc, date, index) => {
      const total = arrData.filter((item) => item.date === date).reduce((sum, report) => sum + parseInt(report.amount), 0);

      if (index) {
        acc.push(acc[acc.length - 1] + total);
      } else {
        acc.push(total);
      }

      return acc;
    }, []);
  };

  const incomeAmounts = reduceOperationInDate(incomeData);
  const expensesAmounts = reduceOperationInDate(expensesData);

  const balanceAmounts = incomeAmounts.map((income, i) => income - expensesAmounts[i]);

  clearChart();

  const canvas = document.createElement("canvas");
  reportChart.append(canvas);

  const context = canvas.getContext("2d");

  if (chart instanceof Chart) {
    chart.destroy();
  }

  chart = new Chart(context, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [
        { label: "Прибыль", data: incomeAmounts },
        { label: "Убыток", data: expensesAmounts },
        { label: "Баланс", data: balanceAmounts },
      ],
    },
  });
};
