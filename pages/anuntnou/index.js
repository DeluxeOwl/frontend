import Layout from "../../components/layout";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

import getUser from "../../utils/auth";

import axios from "axios";
export default function AnuntNou() {
  const [categories, setCategories] = useState([]);

  const [Nume, setNume] = useState("");
  const [Categorie, setCategorie] = useState("Auto/Moto");
  const [Descriere, setDescriere] = useState("");
  const [Contact, setContact] = useState("");
  const [Pret, setPret] = useState("");
  const [Poza, setPoza] = useState(null);

  function handleNume(e) {
    setNume(e.target.value);
  }
  function handleCategorie(e) {
    setCategorie(e.target.value);
  }
  function handleDescriere(e) {
    setDescriere(e.target.value);
  }
  function handleContact(e) {
    setContact(e.target.value);
  }
  function handlePret(e) {
    setPret(e.target.value);
  }
  function handlePoza(e) {
    setPoza(e.target.files[0]);
  }
  let token = null;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("auth");
  }

  function handleSubmit(e) {
    e.preventDefault();

    let numePoza = JSON.parse(localStorage.getItem("user")).username + " ";
    numePoza = numePoza.concat(Nume).split(" ").join("_");

    const formData = new FormData();
    formData.append("files", Poza, numePoza);

    axios
      .post("http://localhost:1337/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let data = {
          nume: Nume,
          descriere: Descriere,
          pret: Pret,
          contact: Contact,
          categorie: Categorie,
          url_imagine: res.data[0]["url"],
        };

        axios
          .post("http://localhost:1337/products", data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:1337/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout title="Anunt nou">
      <div
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Nume anunt</Form.Label>
            <Form.Control
              value={Nume}
              onChange={handleNume}
              type="text"
              placeholder="ex. Laptop Asus, Angajez instalator"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Categorie</Form.Label>
            <Form.Control onChange={handleCategorie} as="select">
              {categories.map((categorie, i) => (
                <option key={i} value={categorie.Nume}>
                  {categorie.Nume}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descriere produs</Form.Label>
            <Form.Control
              value={Descriere}
              onChange={handleDescriere}
              as="textarea"
              rows={3}
              placeholder="ex: Stare functionare buna, pret negociabil"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                value={Contact}
                onChange={handleContact}
                type="text"
                placeholder="+123456789, contact@exemplu.com"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Pret</Form.Label>
              <Form.Control
                value={Pret}
                onChange={handlePret}
                type="text"
                placeholder="Pretul in RON, ex: 1500 RON"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Poza principala"
              onChange={handlePoza}
            />
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit" block>
            Adauga
          </Button>
        </Form>
      </div>
    </Layout>
  );
}
