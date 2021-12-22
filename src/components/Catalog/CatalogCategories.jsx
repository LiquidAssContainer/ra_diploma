import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeActiveCategory,
  getCategoriesAsync,
} from '../../reducers/catalog';

import classNames from 'classnames';

export const CatalogCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.catalog);

  useEffect(async () => {
    dispatch(getCategoriesAsync());
  }, []);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map(({ title, id }) => (
        <CatalogNavItem label={title} category={id} key={id} />
      ))}
    </ul>
  );
};

const CatalogNavItem = ({ label, category }) => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.catalog);

  const onClick = () => {
    dispatch(changeActiveCategory(category));
  };

  return (
    <li
      className={classNames('nav-item', 'catalog-nav-item', {
        active: activeCategory === category,
      })}
    >
      <a className="nav-link" onClick={onClick}>
        {label}
      </a>
    </li>
  );
};
