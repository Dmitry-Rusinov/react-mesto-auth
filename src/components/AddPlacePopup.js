import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [newPlace, setNewPlace] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [newPlaceDirty, setNewPlaceDirty] = useState(false);
  const [pictureLinkDirty, setPictureLinkDirty] = useState(false);
  const [newPlaceError, setNewPlaceError] = useState("Поле не может быть пустым");
  const [picrureLinkError, setPictureLinkError] = useState("Поле не может быть пустым");

  function blurHandler(e) {
    switch (e.target.name) {
      case 'newPlace' :
        setNewPlaceDirty(true)
        break
      case 'pictureLink' :
        setPictureLinkDirty(true)
        break
    }
  }

  function handleChangeNewPlace(e) {
    setNewPlace(e.target.value);
    if (e.target.value.length < 2) {
      setNewPlaceError("Минимальное количество символов: 2")
      if (!e.target.value) {
        setNewPlaceError("Поле не может быть пустым")
      }
    } else {
      setNewPlaceError("")
    }
  }

  function handleChangePictureLink(e) {
    setPictureLink(e.target.value);
    const reg = /^(http|ftp)s?:\/\/((?=.{3,253}$)(localhost|(([^ ]){1,63}\.[^ ]+)))$/
    if(!reg.test(String(e.target.value))) {
      setPictureLinkError("Введите ссылку на изображение")
    } else {
      setPictureLinkError("")
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: newPlace,
      link: pictureLink,
    });
  }

  useEffect(() => {
    setNewPlace("");
    setPictureLink("");
    setNewPlaceDirty("");
    setPictureLinkDirty("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup_addCard"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
        picrureLinkError={picrureLinkError}
        newPlaceError={newPlaceError}
        newPlace={newPlace}
        pictureLink={pictureLink}
        >
      <fieldset className="popup__content">
        <input
          className="popup__input"
          id="card-description"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          name="newPlace"
          required
          value={newPlace}
          onChange={e => handleChangeNewPlace(e)}
          onBlur={e => blurHandler(e)}
        />
        <span className="popup__input-error card-description-error">{(newPlaceDirty && newPlaceError)}</span>
        <input
          className="popup__input"
          id="picture-link"
          type="url"
          placeholder="Ссылка на картинку"
          minLength="1"
          maxLength="400"
          name="pictureLink"
          required
          value={pictureLink}
          onChange={e => handleChangePictureLink(e)}
          onBlur={e => blurHandler(e)}
        />
        <span className="popup__input-error picture-link-error">{(pictureLinkDirty && picrureLinkError)}</span>
      </fieldset>
    </PopupWithForm>
  );
}
