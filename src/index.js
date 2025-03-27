import renderFinanceAmount from "./js/renderFinanceAmount";
import { initFinanceHandlers } from "./js/financeController";
import { initReportHandlers } from "./js/reportController";
import { removePreloader, startPreloader } from "./js/preloader";

const init = async () => {
  startPreloader(document.body);
  renderFinanceAmount().then(() => removePreloader());
  initFinanceHandlers();
  initReportHandlers();
};

init();
