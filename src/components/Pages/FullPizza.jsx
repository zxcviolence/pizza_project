import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState("");

  React.useEffect(() => {
    async function getPizzas() {
      try {
        const { data } = await axios.get(
          `https://64046c0c80d9c5c7bac766df.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!", error);
      }
    }
    getPizzas();
  }, []);

  if (!pizza) {
    return "Загрузка..."
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
