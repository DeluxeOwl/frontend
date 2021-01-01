import Layout from "../../components/layout";
import Badge from "react-bootstrap/Badge";
import CardProdus from "../../components/card";

import styles from "../../components/index.module.scss";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [anunturi, setAnunturi] = useState(null);
  const [noAnunturi, setNoAnunturi] = useState(false);
  let nume_proprietar = null;

  if (typeof localStorage !== "undefined") {
    nume_proprietar = JSON.parse(localStorage.getItem("user")).username;
  }

  useEffect(() => {
    axios
      .get("http://localhost:1337/products?_sort=created_at")
      .then((res) => setAnunturi(res.data))
      .catch((err) => console.log(err));
  }, []);

  function showAnunturi() {
    if (!anunturi) {
      return (
        <div className={styles.mainwrapper}>
          <h1>
            Anunturile <Badge variant="primary">postate de mine</Badge>
          </h1>
        </div>
      );
    } else {
      let anunturiToShow = anunturi.map((anunt) =>
        anunt.nume_proprietar === nume_proprietar ? (
          <CardProdus
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

      return anunturiToShow;
    }
  }

  return (
    <Layout title="Bun venit">
      <div className={styles.mainwrapper}>
        <h1>
          Anunturile <Badge variant="primary">postate de mine</Badge>
        </h1>
      </div>

      <div className={styles.grid}>{showAnunturi()}</div>
    </Layout>
  );
}
