import { API_URL } from "./const";
import gsap from "gsap";
import { financeAmount, financeForm, report, reportButton, financeSection } from "./elements";
import { getData, postData } from "./service";
import { removePreloader, startPreloader } from "./preloader";
import { storage } from "./storage";
import { animateNumber } from "./utils";
import { clearChart } from "./chartController";
import renderReport from "./renderReport";

const closeReport = (e) => {
  if (e.target.closest(".report__close") || e.target === financeSection) {
    gsap.to(report, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power1.out",
      onComplete() {
        report.style.visibility = "hidden";
      },
    });

    clearChart();
    financeSection.removeEventListener("click", closeReport);
    reportButton.disabled = false;
  }
};

const openReport = () => {
  gsap.to(report, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power1.in",
    visibility: "visible",
    onComplete() {},
  });

  financeSection.addEventListener("click", closeReport);
};

export const initFinanceHandlers = async () => {
  financeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const typeOperation = e.submitter.dataset.typeOperation;
    const changeAmount = Math.abs(parseInt(financeForm.amount.value));
    const formData = Object.fromEntries(new FormData(financeForm));
    formData.type = typeOperation;

    postData(`${API_URL}/api/finance`, formData);

    if (typeOperation === "income") {
      storage.amount += changeAmount;
    }
    if (typeOperation === "expenses") {
      storage.amount -= changeAmount;
    }

    animateNumber(financeAmount, storage.amount);
    financeForm.reset();
  });

  reportButton.addEventListener("click", async () => {
    reportButton.disabled = true;
    reportButton.textContent = "";
    startPreloader(reportButton);
    const data = await getData(`${API_URL}/api/finance`);
    removePreloader();
    reportButton.textContent = "Отчет";
    renderReport(data);
    openReport();
    storage.data = data;
  });
};
