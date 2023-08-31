import React, { useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpened] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpened] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpened] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpened(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpened(true);
  };

  const handleButtonDeleteCardClick = () => {
    setConfirmationPopupOpen(true);
  }

  /*const handleRegisterPopupClick = () => {
    setRegisterPopupOpen(true);
  }*/

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => {
          return cards.filter((card) => card._id !== cardId);
        });
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setConfirmationPopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (userAvatar) => {
    api
      .setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .setUserCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header
          />
          <Routes>
            <Route path="/signup" element={<Register/>} />
            <Route path="/signin" element={<Login/>} /> 
          <Route
            path="/"
            element={<ProtectedRoute 
              component={ <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards} /> }
              />}
            loggedIn={loggedIn}
            
          />
          </Routes> 
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
