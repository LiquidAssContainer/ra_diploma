import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { changeSearchString, getProductsAsync } from '../../reducers/catalog';

export const NavBarControls = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cart } = useSelector((state) => state.cart);

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const [isFormInvisible, setIsFormInvisible] = useState(true);
  const [search, setSearch] = useState('');

  const onSearchClick = () => {
    if (search) {
      onSubmit();
    } else {
      setIsFormInvisible(!isFormInvisible);
    }
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    dispatch(changeSearchString(search));
    dispatch(getProductsAsync());
    setSearch('');
    history.push('/catalog');
  };

  const onInput = (value) => {
    setSearch(value);
  };

  return (
    <div>
      <div className="header-controls-pics">
        <div
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
          onClick={onSearchClick}
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

      <SearchForm
        isInvisible={isFormInvisible}
        onSubmit={onSubmit}
        onInput={onInput}
        value={search}
      />
    </div>
  );
};

const SearchForm = ({ isInvisible, onInput, onSubmit, value }) => {
  const onChange = ({ target: { value } }) => {
    onInput(value);
  };

  return (
    <form
      data-id="search-form"
      className={cn('header-controls-search-form', 'form-inline', {
        invisible: isInvisible,
      })}
      onSubmit={onSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};
