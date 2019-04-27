const getBoardsByUser = (firestoreDB, userId) =>
  firestoreDB
    .collection("users")
    .doc(userId)
    .get()
    .catch(console.error);

const getBoards = firestoreDB =>
  firestoreDB
    .collection("boards")
    .get()
    .catch(console.error);

const getBoardsContent = firestoreDB => (req, res) =>
  Promise.resolve(
    getBoards(firestoreDB).then(servicesInformation =>
      servicesInformation.docs.map(board => board.data())
    )
  )
    .then(boards => res.send(boards))
    .catch(console.error);

/*const getBoardsContent = firestoreDB => (req, res) =>
  Promise.resolve(
    getBoards(firestoreDB, req.params.userId).then(response => response.data())
  )
    .then(boards => res.send(boards))
    .catch(console.error);*/

const addNewBoard = firestoreDB => (req, res) => {
  console.log(req.query.title);
  console.log(req.query);
  let boardContent = req.query;
  firestoreDB
    .collection("boards")
    .add(boardContent)
    .then(board => board)
    .catch(console.error);
};

module.exports = {
  getBoards,
  addNewBoard,
  getBoardsContent
};
