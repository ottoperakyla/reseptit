import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default props => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    cookingTime: "30min",
    ingredient: "Liha"
  });
  const { receiptId } = props.match.params;
  const receiptRef = receiptId && firestore.doc(`receipts/${receiptId}`);

  useEffect(() => {
    async function fetchReceipt() {
      if (receiptId) {
        const snapshot = await receiptRef.get();

        if (snapshot.exists) {
          setFormData({ ...snapshot.data() });
        }
      }
    }
    fetchReceipt();
  }, []);

  const deleteReceipt = e => {
    e.preventDefault();
    if (
      window.confirm(`Haluatko varmasti poistaa reseptin ${formData.title}?`)
    ) {
      receiptRef.delete();
      props.history.push("/");
    }
  };

  const setInput = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validUrl = url => /https?:\/\/.*/.test(url);

  const submitForm = e => {
    e.preventDefault();
    if (formData.title.trim() === "" || !validUrl(formData.url)) {
      alert("Reseptin nimi ja linkki ovat pakollisia.");
      return;
    }
    if (receiptRef) {
      receiptRef.update(formData);
    } else {
      firestore.collection("receipts").add(formData);
    }
    props.history.push("/");
  };

  return (
    <Form>
      {receiptRef && (
        <Button onClick={deleteReceipt} color="danger">
          Poista
        </Button>
      )}
      <FormGroup>
        <Label for="title">Nimi</Label>
        <Input
          onChange={setInput}
          value={formData.title}
          type="text"
          id="title"
        />
      </FormGroup>
      <FormGroup>
        <Label for="url">Linkki</Label>
        <Input value={formData.url} onChange={setInput} type="text" id="url" />
      </FormGroup>
      <FormGroup>
        <Label for="cookingTime">Valmistusaika</Label>
        <Input
          value={formData.cookingTime}
          onChange={setInput}
          type="select"
          name="select"
          id="cookingTime"
        >
          <option>30min</option>
          <option>60min</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="ingredient">Raaka-aine</Label>
        <Input
          value={formData.ingredient}
          onChange={setInput}
          type="select"
          name="select"
          id="ingredient"
        >
          <option>Liha</option>
          <option>Kana</option>
          <option>Kala</option>
          <option>Vegaani</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="description">Kuvaus</Label>
        <Input
          value={formData.description}
          onChange={setInput}
          type="textarea"
          name="text"
          id="description"
        />
      </FormGroup>
      <Button onClick={submitForm} className="form-control" color="primary">
        Tallenna
      </Button>
    </Form>
  );
};
