import { BasketItem } from "../features/basketSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getItemsFromLS = () => {
  const data = localStorage.getItem("items");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as BasketItem[],
    totalPrice,
  };
};
