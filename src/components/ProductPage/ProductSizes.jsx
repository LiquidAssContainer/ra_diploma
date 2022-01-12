import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import cn from 'classnames';

import { selectSize } from '../../reducers/productPage';

export const ProductSizes = ({ sizes }) => {
  return sizes.length ? (
    <p>
      Размеры в наличии:{' '}
      {sizes.map(({ size }) => (
        <ProductSize size={size} key={nanoid()} />
      ))}
    </p>
  ) : (
    <p>Нет в наличии :(</p>
  );
};

const ProductSize = ({ size }) => {
  const dispatch = useDispatch();
  const { selectedSize } = useSelector((state) => state.productPage);

  const onClick = () => {
    dispatch(selectSize(size));
  };

  return (
    <span
      className={cn('catalog-item-size', {
        selected: selectedSize === size,
      })}
      onClick={onClick}
    >
      {size}
    </span>
  );
};
