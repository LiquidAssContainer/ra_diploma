import { Catalog } from '../Catalog';
import { ProductList } from '../ProductList';

export const Homepage = () => {
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <ProductList products={[]} />
      </section>
      <Catalog />
    </>
  );
};
