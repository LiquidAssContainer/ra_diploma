import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

export const NavBarControls = () => {
  const { cart } = useSelector((state) => state.cart);

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const [isFormInvisible, setIsFormInvisible] = useState(true);

  const onSearchExpand = () => {
    setIsFormInvisible(!isFormInvisible);
  };

  return (
    <div>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
          onClick={onSearchExpand}
        ></div>

        <Link to="/cart">
          <div className="header-controls-pic header-controls-cart">
            {totalQuantity > 0 && (
              <div className="header-controls-cart-full">{totalQuantity}</div>
            )}
            <div className="header-controls-cart-menu"></div>
          </div>
        </Link>
      </div>

      <SearchForm isInvisible={isFormInvisible} />
    </div>
  );
};

const SearchForm = ({ isInvisible }) => {
  const onInput = ({ target: { value } }) => {
    console.log(value);
  };

  return (
    <form
      data-id="search-form"
      className={cn('header-controls-search-form', 'form-inline', {
        invisible: isInvisible,
      })}
    >
      <input className="form-control" placeholder="Поиск" onChange={onInput} />
    </form>
  );
};
