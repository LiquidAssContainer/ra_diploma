import { useEffect, useState } from 'react';
import { NavLink, HashRouter as Router } from 'react-router-dom';
import { ProductList } from '../ProductList';

export const Catalog = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch(process.env.REACT_APP_TOP_SALES);
    const data = await res.json();
    console.log(data);
    setData(data);
  }, []);

  return (
    <section class="catalog">
      <h2 class="text-center">Каталог</h2>
      <ul class="catalog-categories nav justify-content-center">
        <Router>
          <CatalogNavItem exact to="/" label="Все" />
          <CatalogNavItem exact to="/" label="Женская обувь" />
          <CatalogNavItem exact to="/" label="Мужская обувь" />
          <CatalogNavItem exact to="/" label="Обувь унисекс" />
          <CatalogNavItem exact to="/" label="Детская обувь" />
        </Router>
      </ul>

      <ProductList products={data} />

      <div class="text-center">
        <button class="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  );
};

const CatalogNavItem = ({ label, ...props }) => {
  return (
    <li className="nav-item">
      <NavLink
        {...props}
        activeClassName="active"
        className="nav-link catalog-nav-link"
      >
        {label}
      </NavLink>
    </li>
  );
};
