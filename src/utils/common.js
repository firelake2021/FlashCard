import { deleteCard, deleteDeck } from "../utils/api";

//Study deck
///decks/:deckId/study
const handleOnClickStudy = (id) => {
  window.location = `/decks/${id}/study`;
};

//DeleteDeck
////decks/:deckId
const handleOnClickDeleteDeck = async (id) => {
  const confirmBox = window.confirm(
    "Delete this deck?\n You will not be able recover it"
  );
  if (confirmBox === true) {
    const response = await deleteDeck(id);
    console.log("saved data", response);
  }
  window.location = "/";
};

const handleOnClickDeleteCard = async (id) => {
  const confirmBox = window.confirm(
    "Delete this card?\n You will not be able recover it"
  );
  if (confirmBox === true) {
    const response = await deleteCard(id);
    console.log("saved data", response);
  } else window.location = "/";
};

export { handleOnClickStudy, handleOnClickDeleteDeck, handleOnClickDeleteCard };
