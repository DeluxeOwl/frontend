import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

import axios from "axios";

import { useState, useRef } from "react";

export default function FavouriteButton({ id }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

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

  function addToFav() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
    axios
      .post(
        "http://localhost:1337/favorites",
        { user: { nume: nume_proprietar, post_favorit: id } },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Button
        style={{ backgroundColor: "#f7f7f7" }}
        ref={target}
        onClick={addToFav}
      >
        ❤
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Adaugat la favorite
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
