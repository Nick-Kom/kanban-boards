const functions = require("firebase-functions");

const cors = require("cors")();
const express = require("express");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firestore);

const firestoreDB = admin.firestore();

const getExpress = () => {
  const newExpress = express();
  newExpress.use(cors);
  return newExpress;
};

const api = getExpress();

api.get(
  "/columns/:boardId",
  require("./columns").getColumnsContent(firestoreDB)
);
api.get("/cards/:boardId", require("./cards").getCardsContent(firestoreDB));
api.get("/boards", require("./boards").getBoardsContent(firestoreDB));

api.post("/add-column", require("./columns").addColumn(firestoreDB));
api.post("/add-card", require("./cards").addCard(firestoreDB));

api.patch(
  "/update-column",
  require("./columns").updateColumnContent(firestoreDB)
);
api.patch("/update-card", require("./cards").updateCardContent(firestoreDB));

api.delete(
  "/delete-column/:boardId/:columnId",
  require("./columns").deleteColumn(firestoreDB)
);
api.delete(
  "/delete-card/:boardId/:cardId",
  require("./cards").deleteCard(firestoreDB)
);

exports.api = functions.https.onRequest(api);
