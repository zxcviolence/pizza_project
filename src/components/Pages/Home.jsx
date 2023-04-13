import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import { setCategoryId } from "../../features/filterSlice";
import Categories from "../Categories";
import Pagination from "../Pagination";
import PizzaBlock from "../PizzaBlock";
import Skeleton from "../PizzaBlock/Skeleton";
import Sort from "../Sort";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort } = useSelector((state) => state.filter);

  const { search } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortType = sort.sortProperty;

  React.useEffect(() => {
    setLoading(true);

    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const page = `${currentPage}&limit=4`;

    fetch(
      `https://64046c0c80d9c5c7bac766df.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => alert("Error: " + error.message));
  }, [categoryId, sortType, search, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  console.log(categoryId);

  const sceleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    .filter((pizza) => {
      if (pizza.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? sceleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
