import { useState } from "react";

export default function Login() {
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
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}
