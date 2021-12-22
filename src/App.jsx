import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { About } from './components/About';
import { Banner } from './components/Banner';
import { Cart } from './components/Cart';
import { Catalog } from './components/Catalog';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { NotFound } from './components/NotFound';
import { ProductPage } from './components/ProductPage';

export const App = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Router>
              <Switch>
                <Route path="/products/:id" component={ProductPage} />
                {/* <Route path="/catalog/0">
                  <Redirect to="/catalog" />
                </Route> */}
                <Route path="/catalog/:id?" component={Catalog} />
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/" component={Homepage} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
