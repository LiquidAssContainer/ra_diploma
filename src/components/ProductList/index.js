export const ProductList = ({ products, length }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))}
    </div>
  );
};

const ProductItem = ({ id, category, title, price, images }) => {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img
          src={images[0]}
          className="card-img-top img-fluid"
          alt="Босоножки 'MYER'"
        />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <a href="/products/1.html" className="btn btn-outline-primary">
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};
