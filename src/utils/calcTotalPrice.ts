import { BasketItem } from "../features/basketSlice";

export const calcTotalPrice = (items: BasketItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
