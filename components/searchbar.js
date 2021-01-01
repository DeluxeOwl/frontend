import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import styles from "./searchbar.module.scss";

import axios from "axios";

export default function SearchBar({
  produs,
  setProdus,
  categorie,
  setCategorie,
  categories,
  setCategories,
  filter,
  setFilter,
}) {
  useEffect(() => {
    axios
      .get("http://localhost:1337/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleProdusChange(e) {
    setProdus((produs) => e.target.value);
    console.log(produs);
  }
  function handleCategorieChange(e) {
    setCategorie((categorie) => e.target.value);
  }
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  function handleSearch(e) {
    e.preventDefault();
    console.log(produs, categorie);

    if (isEmptyOrSpaces(produs) && categorie === "Categorie") {
      setFilter(false);
    } else {
      setFilter(true);
    }
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
              {categories.map((categorie, i) => (
                <option key={i} value={categorie.Nume}>
                  {categorie.Nume}
                </option>
              ))}
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
