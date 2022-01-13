import { Link, HashRouter as Router } from 'react-router-dom';

import { useGetImage } from '../../hooks/useGetImage';
import placeholder from '../../assets/shoe-placeholder.png';

export const ProductList = ({ products }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))}
    </div>
  );
};

const ProductItem = ({ id, title, price, images }) => {
  const image = useGetImage(images, placeholder);

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className="card-img-container">
          <img
            src={image}
            className="card-img-top img-fluid"
            alt="Босоножки 'MYER'"
          />
        </div>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <Router>
            <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
              Заказать
            </Link>
          </Router>
        </div>
      </div>
    </div>
  );
};
