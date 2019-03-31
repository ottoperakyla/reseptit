import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import Card from "./Card";

export default () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("receipts")
      .onSnapshot(snapshot => {
        const receipts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReceipts(receipts);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {receipts.map(receipt => (
        <Card {...receipt} key={receipt.id} />
      ))}
    </>
  );
};
