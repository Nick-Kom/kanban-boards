const getCards = (firestoreDB, boardId) =>
  firestoreDB
    .collection("boards")
    .doc(boardId)
    .collection("boardCards")
    .orderBy("position")
    .get()
    .catch(console.error);

const updateCard = (firestoreDB, boardId, data) => {
  let card = {
    id: data.id,
    columnId: data.columnId,
    position: data.position,
    title: data.title
  };

  return firestoreDB
    .collection("boards")
    .doc(boardId)
    .collection("boardCards")
    .doc(data.id)
    .update(card)
    .then(() => card)
    .catch(console.error);
};

const addCard = firestoreDB => (req, res) => {
  let card = {
    id: "",
    columnId: req.body.columnId,
    position: req.body.position,
    title: req.body.title
  };

  return firestoreDB
    .collection("boards")
    .doc(req.body.boardId)
    .collection("boardCards")
    .add(card)
    .then(cardRes => {
      card.id = cardRes.id;
      updateCard(firestoreDB, req.body.boardId, card);
      res.send(card);
    })
    .catch(console.error);
};

const deleteCard = firestoreDB => (req, res) => {
  return firestoreDB
    .collection("boards")
    .doc(req.params.boardId)
    .collection("boardCards")
    .doc(req.params.cardId)
    .delete()
    .then(card => res.send(card))
    .catch(console.error);
};

const getCardsContent = firestoreDB => (req, res) =>
  Promise.resolve(
    getCards(firestoreDB, req.params.boardId).then(cardsInformation =>
      cardsInformation.docs.map(card => card.data())
    )
  )
    .then(cards => res.send(cards))
    .catch(console.error);

const updateCardContent = firestoreDB => (req, res) =>
  Promise.resolve(
    updateCard(firestoreDB, req.body.boardId, req.body).then(
      cardInformation => cardInformation
    )
  )
    .then(card => res.send(card))
    .catch(console.error);

module.exports = {
  addCard,
  deleteCard,
  getCardsContent,
  updateCardContent
};
