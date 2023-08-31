import headerLogo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ onRegister }) {
  return (
    <header className="header">
      <img alt="Логотип" src={headerLogo} className="header__logo" />
      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__button-auth">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__button-auth">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}
