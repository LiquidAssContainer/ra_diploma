import { useDispatch, useSelector } from 'react-redux';
import { changeFieldValue, sendOrderAsync } from '../../reducers/cart';

export const OrderForm = () => {
  const {
    owner: { phone, address },
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    console.log(e);
    console.log('субмит');
    dispatch(sendOrderAsync());
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={onSubmit} autoComplete="off">
          <OrderFormTextInput
            name="phone"
            label="Телефон"
            placeholder="Ваш телефон"
            value={phone}
            required
          />
          <OrderFormTextInput
            name="address"
            label="Адрес доставки"
            placeholder="Адрес доставки"
            value={address}
            required
          />
          <OrderFormCheckbox
            name="agreement"
            label="Согласен с правилами доставки"
            required
          />
          <button type="submit" className="btn btn-outline-secondary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};

const OrderFormTextInput = ({ name, label, placeholder, required, value }) => {
  const dispatch = useDispatch();

  const onChange = ({ target: { value } }) => {
    dispatch(changeFieldValue({ name, value }));
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

const OrderFormCheckbox = ({ name, label, required }) => {
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={name}
        required={required}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
