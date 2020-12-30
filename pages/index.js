import Layout from "../components/layout";
import SearchBar from "../components/searchbar";
import Badge from "react-bootstrap/Badge";
import CardProdus from "../components/card";

import styles from "../components/index.module.scss";
export default function Home() {
  return (
    <Layout title="Bun venit">
      <SearchBar />
      <div className={styles.mainwrapper}>
        <h1>
          Anunturi <Badge variant="secondary">Noi</Badge>
        </h1>
      </div>

      <div className={styles.grid}>
        <CardProdus
          titlu="Laptop asus"
          imagine="/laptop.jpg"
          data={new Date()}
          text="Lorem ipsum dolor sit amet, quem nibh legendos vel cu, no usu unum intellegat. Vix ne habeo dicat expetenda. Sed diam paulo conclusionemque ne, mel ubique possit graecis ne. Alia vivendo interpretaris et mea, decore propriae mel ea."
          contact={"+40774041350"}
          pret={1500}
        />
      </div>
    </Layout>
  );
}
