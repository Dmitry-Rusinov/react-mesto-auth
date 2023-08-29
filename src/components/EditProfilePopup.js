import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup_editProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="popup__content">
        <input
          className="popup__input popup__input_user_name"
          type="text"
          id="user-name"
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          name="name"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error user-name-error"></span>
        <input
          className="popup__input popup__input_user_job"
          type="text"
          id="description"
          placeholder="Дополнительная информация"
          minLength="2"
          maxLength="200"
          name="about"
          onChange={handleChangeDescription}
          value={description || ""}
          required
        />
        <span className="popup__input-error description-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
