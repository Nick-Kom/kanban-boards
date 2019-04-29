const getColumns = (firestoreDB, boardId) =>
  firestoreDB
    .collection("boards")
    .doc(boardId)
    .collection("boardColumns")
    .orderBy("position")
    .get()
    .catch(console.error);

const updateColumn = (firestoreDB, boardId, data) => {
  let column = {
    id: data.id,
    date: data.date,
    title: data.title,
    position: data.position
  };

  return firestoreDB
    .collection("boards")
    .doc(boardId)
    .collection("boardColumns")
    .doc(data.id)
    .update(column)
    .then(() => column)
    .catch(console.error);
};

const addColumn = firestoreDB => (req, res) => {
  let column = {
    id: "",
    date: req.body.date,
    title: req.body.title,
    position: req.body.position
  };

  return firestoreDB
    .collection("boards")
    .doc(req.body.boardId)
    .collection("boardColumns")
    .add(column)
    .then(columnRes => {
      column.id = columnRes.id;
      updateColumn(firestoreDB, req.body.boardId, column);
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

const updateColumnContent = firestoreDB => (req, res) =>
  Promise.resolve(
    updateColumn(firestoreDB, req.body.boardId, req.body).then(
      columnInformation => columnInformation
    )
  )
    .then(column => res.send(column))
    .catch(console.error);

module.exports = {
  addColumn,
  deleteColumn,
  getColumnsContent,
  updateColumnContent
};
