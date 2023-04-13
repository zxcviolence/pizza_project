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

  const { search } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [catId, setCatId] = React.useState(0);
  const [sort, setSort] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const categoryId = useSelector((state) => state.filter.categoryId);

  React.useEffect(() => {
    setLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = catId > 0 ? `category=${catId}` : "";
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
      .catch((error) => alert({ error: error.message }));
  }, [catId, sort, search, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

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
        <Categories
          value={catId}
          onClickCategory={(index) => setCatId(index)}
        />
        <Sort sortValue={sort} onChangeSort={(index) => setSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? sceleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
