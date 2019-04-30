const getBoards = firestoreDB =>
  firestoreDB
    .collection("boards")
    .get()
    .catch(console.error);

const getBoardsContent = firestoreDB => (req, res) =>
  getBoards(firestoreDB)
    .then(boardsInformation =>
      boardsInformation.docs.map(board => board.data())
    )
    .then(boards => res.send(boards))
    .catch(console.error);

module.exports = {
  getBoardsContent
};
