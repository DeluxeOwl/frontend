import Layout from "../components/layout";
import SearchBar from "../components/searchbar";
import Badge from "react-bootstrap/Badge";
import CardProdus from "../components/card";

import styles from "../components/index.module.scss";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [anunturi, setAnunturi] = useState(null);

  const [produs, setProdus] = useState("");
  const [categorie, setCategorie] = useState("Categorie");

  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1337/products?_sort=created_at")
      .then((res) => setAnunturi(res.data))
      .catch((err) => console.log(err));
  }, []);

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  function showAnunturi() {
    if (!anunturi) {
      return null;
    }
    if (!filter) {
      return anunturi.map((anunt) => (
        <CardProdus
          id={anunt.id}
          key={anunt.id}
          titlu={anunt.nume}
          imagine={`http://localhost:1337${anunt.url_imagine}`}
          data={anunt.created_at}
          text={anunt.descriere}
          contact={anunt.contact}
          pret={anunt.pret}
        />
      ));
    } else {
      if (isEmptyOrSpaces(produs)) {
        return anunturi.map((anunt) =>
          anunt.categorie === categorie ? (
            <CardProdus
              key={anunt.id}
              id={anunt.id}
              titlu={anunt.nume}
              imagine={`http://localhost:1337${anunt.url_imagine}`}
              data={anunt.created_at}
              text={anunt.descriere}
              contact={anunt.contact}
              pret={anunt.pret}
            />
          ) : null
        );
      } else if (categorie === "Categorie") {
        return anunturi.map((anunt) =>
          anunt.nume.includes(produs) || anunt.descriere.includes(produs) ? (
            <CardProdus
              id={anunt.id}
              key={anunt.id}
              titlu={anunt.nume}
              imagine={`http://localhost:1337${anunt.url_imagine}`}
              data={anunt.created_at}
              text={anunt.descriere}
              contact={anunt.contact}
              pret={anunt.pret}
            />
          ) : null
        );
      }
    }
  }

  return (
    <Layout title="Bun venit">
      <SearchBar
        produs={produs}
        setProdus={setProdus}
        categorie={categorie}
        setCategorie={setCategorie}
        categories={categories}
        setCategories={setCategories}
        filter={filter}
        setFilter={setFilter}
      />
      <div className={styles.mainwrapper}>
        <h1>
          Anunturi <Badge variant="secondary">Noi</Badge>
        </h1>
      </div>

      <div className={styles.grid}>{showAnunturi()}</div>
    </Layout>
  );
}
