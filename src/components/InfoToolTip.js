export default function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_infoToolTip ${
        props.isOpen ? "popup_opened" : ""
      }`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__closed"
          onClick={props.onClose}></button>
        <img className="popup__image-tip" src="../images/SignV.svg"></img>
        <p className="popup__confirm-auth"></p>
      </div>
    </div>
  );
}
