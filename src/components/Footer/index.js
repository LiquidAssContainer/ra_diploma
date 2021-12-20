import { HashRouter as Router, Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <FooterNav />
        </div>
        <div className="col">
          <FooterPay />
          <FooterCopyright />
        </div>
        <div className="col text-right">
          <FooterContacts />
        </div>
      </div>
    </footer>
  );
};

const FooterPay = () => {
  return (
    <section>
      <h5>Принимаем к оплате:</h5>
      <div className="footer-pay">
        <div className="footer-pay-systems footer-pay-systems-paypal"></div>
        <div className="footer-pay-systems footer-pay-systems-master-card"></div>
        <div className="footer-pay-systems footer-pay-systems-visa"></div>
        <div className="footer-pay-systems footer-pay-systems-yandex"></div>
        <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
        <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
      </div>
    </section>
  );
};

const FooterCopyright = () => {
  return (
    <section>
      <div className="footer-copyright">
        2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
        Все права защищены.
        <br />
        Доставка по всей России!
      </div>
    </section>
  );
};

const FooterContacts = () => {
  return (
    <section className="footer-contacts">
      <h5>Контакты:</h5>
      <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
        +7 495 79 03 5 03
      </a>
      <span className="footer-contacts-working-hours">
        Ежедневно: с 09-00 до 21-00
      </span>
      <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">
        office@bosanoga.ru
      </a>
      <div className="footer-social-links">
        <div className="footer-social-link footer-social-link-twitter"></div>
        <div className="footer-social-link footer-social-link-vk"></div>
      </div>
    </section>
  );
};

const FooterNav = () => {
  return (
    <section>
      <h5>Информация</h5>
      <ul className="nav flex-column">
        <Router>
          <FooterNavItem to="about" label="О магазине" />
          <FooterNavItem to="catalog" label="Каталог" />
          <FooterNavItem to="contacts" label="Контакты" />
        </Router>
      </ul>
    </section>
  );
};

const FooterNavItem = ({ to, label }) => {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link">
        {label}
      </Link>
    </li>
  );
};
