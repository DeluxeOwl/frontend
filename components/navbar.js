import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import isAuthenticated from "../utils/auth";

import styles from "./navbar.module.scss";

import { useRouter } from "next/router";

export default function MainNavbar(props) {
  const router = useRouter();

  function logOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  function adaugaAnunt() {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      router.push("/anuntnou");
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Link href="/" passHref>
        <Navbar.Brand href="#home">
          <h1 className={styles.home}>OnlyShop</h1>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="Contul meu" id="collasible-nav-dropdown">
            {isAuthenticated() ? (
              <>
                <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                <Link href="/anunturilemele" passHref>
                  <NavDropdown.Item>Anunturile mele</NavDropdown.Item>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                </Link>
                <Link href="/register" passHref>
                  <NavDropdown.Item>Inregistreaza-te</NavDropdown.Item>
                </Link>
              </>
            )}

            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Favorite</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="outline-success" onClick={adaugaAnunt}>
          Adauga un anunt
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
