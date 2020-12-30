import Layout from "../../components/layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [displayAlert, setDisplayAlert] = useState(null);
  const [alertText, setAlertText] = useState("");

  const router = useRouter();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1337/auth/local/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);

        setDisplayAlert("success");
        setAlertText("Te-ai inregistrat cu succes!");

        setTimeout(() => {
          router.push("/login");
        }, 1500);

        setTimeout(() => {
          setDisplayAlert(null);
        }, 3000);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        setDisplayAlert("danger");
        setAlertText("A aparut o eroare");

        setTimeout(() => {
          setDisplayAlert(null);
        }, 3000);
      });
  }

  return (
    <Layout title="Inregistrare">
      <div
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Form style={{ marginBottom: "5%" }}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={handleUsernameChange}
              value={username}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Adresa mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introdu mail-ul"
              onChange={handleEmailChange}
              value={email}
            />
            <Form.Text className="text-muted">
              Nu impartim mail-ul tau cu nimeni
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Parola</Form.Label>
            <Form.Control
              type="password"
              placeholder="Parola"
              onChange={handlePasswordChange}
              value={password}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleRegister}>
            Inregistreaza-te
          </Button>
        </Form>
        {displayAlert ? (
          <Alert variant={displayAlert}>{alertText}</Alert>
        ) : null}
      </div>
    </Layout>
  );
}
