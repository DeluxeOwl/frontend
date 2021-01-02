import Layout from "../../components/layout";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [anunt, setAnunt] = useState(null);

  let nume_proprietar = null;
  let token = null;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:1337/products/${pid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => router.push("/anunturilemele"))
      .catch((err) => console.log(err));
  };

  if (typeof localStorage !== "undefined") {
    if (
      localStorage.getItem("auth") !== null &&
      localStorage.getItem("user") !== null
    ) {
      nume_proprietar = JSON.parse(localStorage.getItem("user")).username;
      token = localStorage.getItem("auth");
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:1337/products/${pid}`)
      .then((res) => setAnunt(res.data))
      .catch((err) => console.log(err));
  }, [pid]);

  console.log(anunt);

  return (
    <Layout title={`Anuntul ${pid}`}>
      {anunt === null ? (
        <Alert variant="danger">A aparut o eroare</Alert>
      ) : (
        <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Acasa</Breadcrumb.Item>
            <Breadcrumb.Item href="/">Anunturi</Breadcrumb.Item>
            <Breadcrumb.Item active>{anunt.nume}</Breadcrumb.Item>
          </Breadcrumb>
          {anunt.nume_proprietar === nume_proprietar ? (
            <Button variant="danger" onClick={handleShow}>
              Sterge anunt
            </Button>
          ) : null}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sterge anuntul</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Esti sigur ca dorest sa stergi anuntul {anunt.nume}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Nu
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Da
              </Button>
            </Modal.Footer>
          </Modal>
          <h1>
            <Badge variant="secondary" large>
              {anunt.nume}
            </Badge>
          </h1>
          <img
            src={`http://localhost:1337${anunt.url_imagine}`}
            alt={anunt.nume}
            style={{ maxHeight: "900px", maxWidth: "900px" }}
          />
          <Card>
            <Card.Header>
              <h2>Descriere</h2>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <pre>{anunt.descriere}</pre>
              </blockquote>
            </Card.Body>
            <Card.Footer>
              {" "}
              <h2>
                <Badge variant="primary" large>
                  Vandut de:
                </Badge>
                &nbsp;{anunt.nume_proprietar}
              </h2>
              <h2>
                <Badge variant="primary" large>
                  Contact:
                </Badge>
                &nbsp;{anunt.contact}
              </h2>
              <h2>
                <Badge variant="primary" large>
                  Postat la:
                </Badge>
                &nbsp;{anunt.published_at}
              </h2>
              <h1>
                <Badge variant="danger" large>
                  Pret
                </Badge>
                &nbsp;{anunt.pret} RON
              </h1>
            </Card.Footer>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default Post;
