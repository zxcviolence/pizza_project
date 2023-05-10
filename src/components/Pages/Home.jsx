/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../features/filterSlice";
import { useNavigate } from "react-router-dom";
import Categories from "../Categories";
import Pagination from "../Pagination";
import PizzaBlock from "../PizzaBlock";
import Skeleton from "../PizzaBlock/Skeleton";
import Sort, { list } from "../Sort";
import { fetchPizzas, selectPizzaData } from "../../features/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage, search } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const page = `${currentPage}&limit=4`;
    const searchValue = search ? `&search=${search}` : "";

    dispatch(
      fetchPizzas({
        order,
        category,
        page,
        sortBy,
        searchValue,
      })
    );

    window.scrollTo(0, 0);
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, search, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        },
        { skipNulls: true }
      );
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

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
      {status === "error" ? (
        <div>
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить данные</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? sceleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
