import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeFromCart } from '../../reducers/cart';

import { Preloader } from '../Preloader';
import { OrderForm } from './OrderForm';

const colTitles = [
  '#',
  'Название',
  'Размер',
  'Кол-во',
  'Стоимость',
  'Итого',
  'Действия',
];

export const Cart = () => {
  const { cart, loading } = useSelector((state) => state.cart);
  const totalSum = cart.reduce((acc, product) => acc + product.sum, 0);

  return loading ? (
    <Preloader />
  ) : (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              {colTitles.map((title) => (
                <th scope="col" key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <CartProduct {...product} index={index} key={product.id} />
            ))}
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{totalSum} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <OrderForm />
    </>
  );
};

const CartProduct = ({ index, id, price, title, quantity, sum, size }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeFromCart({ id, size }));
  };

  return (
    <tr>
      <td scope="row">{index + 1}</td>
      <td>
        <Link to={`/catalog/${id}`}>{title}</Link>
      </td>
      <td>{size}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{sum}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={onRemove}>
          Удалить
        </button>
      </td>
    </tr>
  );
};
