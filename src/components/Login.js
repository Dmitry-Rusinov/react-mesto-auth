import { useEffect, useState } from "react";
import * as Auth from "./Auth";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin, setUserEmail }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    Auth.authorize(email, password)
      .then((data) => {
        if (data) {
          setEmail("");
          setPassword("");
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (handleSubmit) {
      setUserEmail(email);
    }
  });

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
          minLength="4"
          maxLength="12"
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
