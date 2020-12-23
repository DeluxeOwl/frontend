import Head from "next/head";
import MainNavbar from "./navbar.js";
import styles from "./layout.module.scss";
export default function Layout(props) {
  return (
    <div className={styles.mainwrapper}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNavbar />
      {props.children}
    </div>
  );
}
