import React from "react";

function Categories() {
  const [active, setActive] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setActive(index)}
              className={active === index ? "active" : null}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
