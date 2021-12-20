import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';

import { Header } from './components/Header';
import { Homepage } from './components/Homepage';

export const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
};
