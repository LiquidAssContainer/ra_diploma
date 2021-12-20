import { NavLink, Link, HashRouter as Router } from 'react-router-dom';
import { NavBarControls } from './NavBarControls';
import logo from '../../img/header-logo.png';

export const Header = () => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="Bosa Noga" />
              </Link>
              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <NavItem exact to="/" label="Главная" />
                  <NavItem to="/catalog" label="Каталог" />
                  <NavItem to="/about" label="О магазине" />
                  <NavItem to="/contacts" label="Контакты" />
                </ul>
                <NavBarControls />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Router>
  );
};

const NavItem = ({ label, ...props }) => {
  return (
    <li className="nav-item">
      <NavLink {...props} activeClassName="active" className="nav-link">
        {label}
      </NavLink>
    </li>
  );
};
