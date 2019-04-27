const getColumns = (firestoreDB, boardId) =>
  firestoreDB
    .collection("boards")
    .doc(boardId)
    .collection("boardColumns")
    .orderBy("date")
    .get()
    .catch(console.error);

const addColumn = firestoreDB => (req, res) => {
  let column = {
    id: "",
    date: req.body.date,
    title: req.body.title
  };
  return firestoreDB
    .collection("boards")
    .doc(req.body.boardId)
    .collection("boardColumns")
    .add(column)
    .then(columnRes => {
      column.id = columnRes.id;
      firestoreDB
        .collection("boards")
        .doc(req.body.boardId)
        .collection("boardColumns")
        .doc(columnRes.id)
        .update(column);
      res.send(column);
    })
    .catch(console.error);
};

const deleteColumn = firestoreDB => (req, res) => {
  return firestoreDB
    .collection("boards")
    .doc(req.params.boardId)
    .collection("boardColumns")
    .doc(req.params.columnId)
    .delete()
    .then(column => res.send(column))
    .catch(console.error);
};

const getColumnsContent = firestoreDB => (req, res) =>
  Promise.resolve(
    getColumns(firestoreDB, req.params.boardId).then(columnsInformation =>
      columnsInformation.docs.map(column => column.data())
    )
  )
    .then(columns => res.send(columns))
    .catch(console.error);

module.exports = {
  addColumn,
  deleteColumn,
  getColumnsContent
};
