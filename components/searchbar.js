import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import styles from "./searchbar.module.scss";
export default function SearchBar(props) {
  const [produs, setProdus] = useState("");
  const [categorie, setCategorie] = useState("Categorie");

  function handleProdusChange(e) {
    setProdus(e.target.value);
  }
  function handleCategorieChange(e) {
    setCategorie(e.target.value);
  }
  function handleSearch(e) {
    e.preventDefault();
    console.log(produs, categorie);
  }

  return (
    <div className={styles.mainwrapper}>
      <Form>
        <Form.Row>
          <Col xs={7}>
            <Form.Label htmlFor="productsearch" srOnly>
              ProductSearch
            </Form.Label>
            <Form.Control
              onChange={handleProdusChange}
              size="lg"
              className="mt-1 mr-sm-2"
              id="productsearch"
              placeholder="Cauta dupa produs ..."
              value={produs}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleCategorieChange}
              size="lg"
              as="select"
              className="my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              custom
            >
              {/* TODO: make this dinamically from backend */}
              <option value="Categorie">Categorie</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </Form.Control>
          </Col>
          <Col>
            <Button
              type="submit"
              className="my-1"
              size="lg"
              onClick={handleSearch}
            >
              Cauta acum
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
