import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const userAvatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: userAvatarRef.current.value,
    });
  }

  useEffect(() => {
    userAvatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup_edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="popup__content">
        <input
          className="popup__input"
          id="avatar-link"
          type="url"
          placeholder="Ссылка на аватар пользователя"
          minLength="1"
          maxLength="400"
          name="avatarLink"
          required
          ref={userAvatarRef}
        />
        <span className="popup__input-error avatar-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
