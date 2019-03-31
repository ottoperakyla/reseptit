import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";

export default props => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    cookingTime: "30min",
    mainIngredient: "Liha",
    ingredients: [],
    ingredientName: "",
    ingredientUnit: "cl",
    ingredientAmount: 1
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

  const addIngredient = e => {
    e.preventDefault();
    const {
      ingredientName: name,
      ingredientAmount: amount,
      ingredientUnit: unit
    } = formData;
    setFormData({
      ...formData,
      ingredients: formData.ingredients.concat({ name, amount, unit })
    });
  };

  const submitForm = e => {
    e.preventDefault();
    if (formData.title.trim() === "") {
      alert("Reseptin nimi on pakollinen.");
      return;
    }
    if (receiptRef) {
      receiptRef.update(formData);
    } else {
      firestore
        .collection("receipts")
        .add({ ...formData, created: new Date() });
    }
    props.history.push("/");
  };

  return (
    <>
      <Form>
        <h4>Resepti</h4>
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
          <Input
            disabled={formData.ownReceipt}
            value={formData.url}
            onChange={setInput}
            type="text"
            id="url"
          />
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
          <Label for="mainIngredient">Pääraaka-aine</Label>
          <Input
            value={formData.mainIngredient}
            onChange={setInput}
            type="select"
            name="select"
            id="mainIngredient"
          >
            <option>Liha</option>
            <option>Kana</option>
            <option>Kala</option>
            <option>Vegaani</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Ohjeet</Label>
          <Input
            value={formData.instructions}
            onChange={setInput}
            rows="10"
            type="textarea"
            name="text"
            id="instructions"
          />
        </FormGroup>
      </Form>
      <h4>Raaka-aineet</h4>
      <Table>
        <tbody>
          <tr>
            <th>Määrä</th>
            <th>Yksikkö</th>
            <th>Raaka-aine</th>
          </tr>
          {formData.ingredients.map((ingredient, idx) => (
            <tr key={idx}>
              <td>{ingredient.amount}</td>
              <td>{ingredient.unit}</td>
              <td>{ingredient.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="ingredientAmount" className="mr-sm-2">
            Määrä
          </Label>
          <Input
            value={formData.ingredientAmount}
            type="number"
            onChange={setInput}
            id="ingredientAmount"
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="ingredientUnit">Yksikkö</Label>
          <Input
            onChange={setInput}
            value={formData.ingredientUnit}
            type="select"
            name="select"
            id="ingredientUnit"
          >
            <option>cl</option>
            <option>dl</option>
            <option>litra</option>
            <option>g</option>
            <option>kpl</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="ingredientName" className="mr-sm-2">
            Raaka-aine
          </Label>
          <Input
            value={formData.ingredientName}
            onChange={setInput}
            type="text"
            id="ingredientName"
          />
        </FormGroup>
        <Button onClick={addIngredient} className="mb-4 mt-2" color="primary">
          Lisää raaka-aine
        </Button>
      </Form>
      <Button onClick={submitForm} className="form-control" color="primary">
        Tallenna
      </Button>
    </>
  );
};
