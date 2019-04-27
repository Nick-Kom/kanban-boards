const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("this is first test of firebase-functions");
});

const cors = require("cors")();
const express = require("express");
// const { Nuxt } = require('nuxt')

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firestore);

const firestoreDB = admin.firestore();

/* firestoreDB.collection("boards").get().then((querySnapshot) => {
 querySnapshot.forEach((doc) => {
  console.log('board: ', doc.data());

 });
});
*/

const getExpress = () => {
  const newExpress = express();
  newExpress.use(cors);

  return newExpress;
};

const api = getExpress();

// api.get("/boards/:userId", require("./boards").getBoardsContent(firestoreDB));
api.get("/boards", require("./boards").getBoardsContent(firestoreDB));
api.get(
  "/columns/:boardId",
  require("./columns").getColumnsContent(firestoreDB)
);
api.post("/add-column", require("./columns").addColumn(firestoreDB));
api.delete(
  "/delete-column/:boardId/:columnId",
  require("./columns").deleteColumn(firestoreDB)
);
api.get("/board/add", require("./boards").addNewBoard(firestoreDB));

exports.api = functions.https.onRequest(api);
