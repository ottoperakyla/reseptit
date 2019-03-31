const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();
const firestore = admin.firestore();

// exports.addIngredient = functions.firestore
//   .document("receipt/{receiptId}")
//   .onCreate(snapshot => {
//     try {
//       const receipt = snapshot.data();
//       if (receipt.ingredients.length) {
//         const batch = firestore.batch();
//         receipt.ingredients.forEach(ingredient => {
//           const ingredientRef = firestore.doc(`ingredients/${ingredient.name}`);
//           batch.set(ingredientRef, ingredient);
//         });
//         console.log("wat");
//         batch.commit();
//       }
//     } catch (err) {
//       console.error("ERROR: addIngredient", err.message);
//     }
//   });
