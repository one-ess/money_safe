import { API_URL } from "./const";
import { reportDates, reportTable, headerCells, chartButton } from "./elements";
import { storage } from "./storage";
import { startPreloader, removePreloader } from "./preloader";
import { getData, deleteData } from "./service";
import { clearChart, createChart } from "./chartController";
import renderReport from "./renderReport";
import renderFinanceAmount from "./renderFinanceAmount";

const sortData = (e) => {
  storage.data.sort((a, b) => {
    if (e.target.dataset.dir === "asc") {
      [a, b] = [b, a];
    }

    if (e.target.dataset.sort === "amount") {
      return parseInt(a[e.target.dataset.sort]) < parseInt(b[e.target.dataset.sort]) ? -1 : 1;
    }

    return a[e.target.dataset.sort] < b[e.target.dataset.sort] ? -1 : 1;
  });

  if (e.target.dataset.dir === "asc") {
    e.target.dataset.dir = "desc";
  } else {
    e.target.dataset.dir = "asc";
  }

  headerCells.forEach((headerCell) => {
    if (e.target === headerCell) {
      e.target.dataset.dir === "asc" ? (e.target.className = "report__header-cell report__header-cell_asc") : (e.target.className = "report__header-cell report__header-cell_desc");
    } else {
      headerCell.classList.remove("report__header-cell_asc", "report__header-cell_desc");
    }
  });
};

export const initReportHandlers = () => {
  reportDates.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(reportDates));

    const searchParams = new URLSearchParams();

    if (formData.startDate) {
      searchParams.append("startDate", formData.startDate);
    }
    if (formData.endDate) {
      searchParams.append("endDate", formData.endDate);
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/api/finance?${queryString}` : "/api/finance";

    const data = await getData(`${API_URL}${url}`);
    storage.data = data;
    renderReport(storage.data);
    clearChart();
  });

  reportTable.addEventListener("click", async (e) => {
    if (e.target.closest(".report__button")) {
      const reportId = e.target.dataset.id;
      e.target.textContent = "";
      startPreloader(e.target);
      await deleteData(`${API_URL}/api/finance/${reportId}`);
      const data = await getData(`${API_URL}/api/finance`);
      storage.data = data;
      removePreloader();
      renderFinanceAmount();
      clearChart();
      e.target.closest(".report__row").remove();
    }
    if (e.target.closest("[data-sort]")) {
      sortData(e);
      renderReport(storage.data);
    }
  });

  chartButton.addEventListener("click", () => {
    createChart(storage.data);
  });
};
