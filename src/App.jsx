import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { About } from './components/About';
import { Banner } from './components/Banner';
import { BottomPopup } from './components/BottomPopup';
import { Cart } from './components/Cart';
import { Catalog } from './components/Catalog';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { ProductPage } from './components/ProductPage';
import { TopSales } from './components/TopSales';

export const App = () => {
  const { isPopupShown, text, isError } = useSelector((state) => state.popup);
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Router>
              <Switch>
                <Route path="/catalog/:id" component={ProductPage} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/">
                  <TopSales />
                  <Catalog />
                </Route>
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </main>
      <Footer />
      {isPopupShown && <BottomPopup text={text} isError={isError} />}
    </>
  );
};
