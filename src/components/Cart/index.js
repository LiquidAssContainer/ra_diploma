import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../reducers/cart';

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
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const totalSum = cart.reduce((acc, product) => acc + product.sum, 0);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              {colTitles.map((title) => (
                <th scope="col">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <CartProduct {...product} index={index} />
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
      <Order />
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

const Order = () => {
  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};
