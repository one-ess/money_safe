import { API_URL } from "./const";
import { getData } from "./service";
import { financeAmount } from "./elements";
import { storage } from "./storage";
import { animateNumber } from "./utils";

const renderFinanceAmount = async () => {
  const data = await getData(`${API_URL}/api/finance`);
  storage.data = data;
  storage.amount = data.reduce((acc, item) => {
    if (item.type === "income") {
      acc += +item.amount;
    }
    if (item.type === "expenses") {
      acc -= +item.amount;
    }
    return acc;
  }, 0);

  animateNumber(financeAmount, storage.amount);
};

export default renderFinanceAmount;
