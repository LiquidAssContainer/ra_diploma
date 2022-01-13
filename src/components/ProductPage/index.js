import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addToCart } from '../../reducers/cart';
import {
  decreaseQuantity,
  getProductInfoAsync,
  increaseQuantity,
  resetSelected,
} from '../../reducers/productPage';

import { Preloader } from '../Preloader';
import { ProductSizes } from './ProductSizes';
import { NotFound } from '../NotFound';
import { ProductFeaturesTable } from './ProductFeaturesTable';

import placeholder from '../../assets/shoe-placeholder.png';
import { useGetImage } from '../../hooks/useGetImage';

export const ProductPage = ({
  match: {
    params: { id },
  },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, quantity, selectedSize, loading, error } = useSelector(
    (state) => state.productPage,
  );

  const { price, sizes, id: _, category, images, title, ...features } = product;

  const image = useGetImage(images, placeholder);
  const availableSizes = sizes.filter(({ avalible: available }) => available);

  const onBuyClick = () => {
    if (selectedSize) {
      dispatch(addToCart({ quantity, size: selectedSize, ...product }));
      history.push('/cart');
    }
  };

  useEffect(() => {
    dispatch(getProductInfoAsync(id));

    return () => dispatch(resetSelected());
  }, []);

  return loading ? (
    <Preloader />
  ) : error ? (
    <NotFound />
  ) : (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={image} className="img-fluid" alt="ОООБУВЬ" />
        </div>
        <div className="col-7">
          <ProductFeaturesTable {...features} />
          <div className="text-center">
            <ProductSizes sizes={availableSizes} />
            {!!availableSizes.length && (
              <ProductQuantity
                quantity={quantity}
                onDecrease={() => dispatch(decreaseQuantity())}
                onIncrease={() => dispatch(increaseQuantity())}
              />
            )}
          </div>
          {!!availableSizes.length && (
            <button
              disabled={selectedSize === null}
              className="btn btn-danger btn-block btn-lg"
              onClick={onBuyClick}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
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
