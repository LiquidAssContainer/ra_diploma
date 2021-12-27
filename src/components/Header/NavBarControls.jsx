import { useState } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavBarControls = () => {
  const history = useHistory();
  const { cart } = useSelector((state) => state.cart);

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const [isFormInvisible, setIsFormInvisible] = useState(true);

  const onSearchExpand = () => {
    setIsFormInvisible(!isFormInvisible);
  };

  const onCartClick = () => {
    history.push('/cart');
  };

  return (
    <div>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
          onClick={onSearchExpand}
        ></div>

        <div
          className="header-controls-pic header-controls-cart"
          onClick={onCartClick}
        >
          {totalQuantity > 0 && (
            <div className="header-controls-cart-full">{totalQuantity}</div>
          )}
          <div className="header-controls-cart-menu"></div>
        </div>
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
