import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import cn from 'classnames';

import {
  decreaseQuantity,
  getProductInfoAsync,
  increaseQuantity,
  resetSelected,
  selectSize,
} from '../../reducers/productPage';

import { Preloader } from '../Preloader';

export const ProductPage = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const { product, quantity, selectedSize, loading, error } = useSelector(
    (state) => state.productPage,
  );

  const { price, sizes, id: _, category, images, title, ...features } = product;

  useEffect(() => {
    dispatch(getProductInfoAsync(id));

    return () => dispatch(resetSelected());
  }, []);

  return loading ? (
    <Preloader />
  ) : (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images?.[0]} className="img-fluid" alt="ОООБУВЬ" />
        </div>
        <div className="col-7">
          <ProductFeaturesTable {...features} />
          <div className="text-center">
            <ProductSizes sizes={sizes} />
            <ProductQuantity
              quantity={quantity}
              onDecrease={() => dispatch(decreaseQuantity())}
              onIncrease={() => dispatch(increaseQuantity())}
            />
          </div>
          <button className="btn btn-danger btn-block btn-lg">В корзину</button>
        </div>
      </div>
    </section>
  );
};

const ProductSizes = ({ sizes }) => {
  return (
    <p>
      Размеры в наличии:{' '}
      {sizes.map((props) => (
        <ProductSize {...props} key={nanoid()} />
      ))}
    </p>
  );
};

const ProductSize = ({ size, avalible: available }) => {
  const dispatch = useDispatch();
  const { selectedSize } = useSelector((state) => state.productPage);

  const onClick = () => {
    dispatch(selectSize(size));
  };

  return (
    <span
      className={cn('catalog-item-size', {
        selected: selectedSize === size,
        unavailable: !available,
      })}
      onClick={onClick}
    >
      {size}
    </span>
  );
};

const ProductQuantity = ({ onDecrease, onIncrease, quantity }) => {
  return (
    <p>
      Количество:{' '}
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={onDecrease}>
          -
        </button>
        <span className="btn btn-outline-primary">{quantity}</span>
        <button className="btn btn-secondary" onClick={onIncrease}>
          +
        </button>
      </span>
    </p>
  );
};

const ProductFeaturesTable = ({ ...features }) => {
  const productFeatures = [
    ['sku', 'Артикул'],
    ['manufacturer', 'Производитель'],
    ['color', 'Цвет'],
    ['material', 'Материалы'],
    ['season', 'Сезон'],
    ['reason', 'Повод'],
    ['heelSize', 'Высота каблука/подошвы'],
  ];

  return (
    <table className="table table-bordered">
      <tbody>
        {productFeatures.reduce((acc, feature) => {
          const [propName, title] = feature;
          if (features[propName]) {
            acc.push(
              <tr key={propName}>
                <td>{title}</td>
                <td>{features[propName]}</td>
              </tr>,
            );
          }
          return acc;
        }, [])}
      </tbody>
    </table>
  );
};
