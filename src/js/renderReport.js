import { reportList } from "./elements";
import { reformatDate } from "./utils";

const renderReport = (data) => {
  if (data.length === 0) {
    reportList.textContent = "Отчеты отсутствуют";
    reportList.style.display = "block";
    reportList.style.padding = "15px";
  } else {
    reportList.textContent = "";
    reportList.style.cssText = "";
    const reportItems = data.map((reportItem) => {
      const tr = document.createElement("tr");
      tr.classList.add("report__row");

      tr.innerHTML = `<td class="report__cell">${reportItem.category}</td>
                  <td class="report__cell" style='text-align: right'>${parseInt(reportItem.amount).toLocaleString()}&nbsp;₸</td>
                  <td class="report__cell">${reportItem.description}</td>
                  <td class="report__cell">${reformatDate(reportItem.date)}</td>
                  <td class="report__cell">${reportItem.type === "income" ? "прибыль" : "убыток"}</td>
                  <td class="report__action-cell">
                    <button class="report__button report__button_table" data-id=${reportItem.id}>&#10006;</button>
                  </td>`;

      return tr;
    });
    reportList.append(...reportItems);
  }
};

export default renderReport;
