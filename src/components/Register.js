import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          className="auth__input"
          type="email"
          id="user-email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          name="email"
          value={email || ""}
          onChange={handleChangeEmail}
          required
        />
        <span className="auth__input-error user-email-error"></span>
        <input
          className="auth__input"
          type="text"
          id="user-password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          name="password"
          onChange={handleChangePassword}
          value={password || ""}
          required
        />
        <span className="auth__input-error password-error"></span>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <p className="auth__toLogin">
        Уже зарегистрированы?{" "}
        <Link className="auth__button-login" to={"/signin"}>
          Войти
        </Link>
      </p>
    </div>
  );
}
