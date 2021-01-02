import Layout from "../../components/layout";
import Badge from "react-bootstrap/Badge";
import CardProdus from "../../components/card";

import styles from "../../components/index.module.scss";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [anunturi, setAnunturi] = useState(null);
  const [anunturiFav, setAnunturiFav] = useState(null);
  const [noAnunturi, setNoAnunturi] = useState(false);

  let token = null;
  let nume_proprietar = null;
  if (typeof localStorage !== "undefined") {
    if (
      localStorage.getItem("auth") !== null &&
      localStorage.getItem("user") !== null
    ) {
      token = localStorage.getItem("auth");
      nume_proprietar = JSON.parse(localStorage.getItem("user")).username;
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:1337/products?_sort=created_at")
      .then((res) => setAnunturi(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:1337/favorites")
      .then((res) =>
        setAnunturiFav(
          res.data
            .filter((anunt) => anunt.user.nume === nume_proprietar)
            .map((anunt) => anunt.user.post_favorit)
        )
      )
      .catch((err) => console.log(err));
  }, []);

  function showAnunturi() {
    if (anunturiFav === null || anunturiFav.length === 0) {
      return (
        <div className={styles.mainwrapper}>
          <h1>
            <Badge variant="danger">Nu ai anunturi favorite</Badge>
          </h1>
        </div>
      );
    } else {
      return anunturi
        .filter((fav) => anunturiFav.includes(fav.id))
        .map((anunt) => (
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
        ));
    }
  }

  return (
    <Layout title="Bun venit">
      <div className={styles.mainwrapper}>
        <h1>
          Anunturile mele <Badge variant="primary">favorite ❤</Badge>
        </h1>
      </div>

      <div className={styles.grid}>{showAnunturi()}</div>
    </Layout>
  );
}
