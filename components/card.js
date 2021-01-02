import Card from "react-bootstrap/Card";
import Link from "next/link";
import Moment from "react-moment";
import FavouriteButton from "./favouriteButton";
import "moment-timezone";
import "moment/locale/ro";

import Button from "react-bootstrap/Button";
export default function CardProdus({
  data,
  titlu,
  text,
  imagine,
  contact,
  pret,
  id,
}) {
  return (
    <Card style={{ width: "22rem" }} border="dark">
      <Card.Header>
        <div
          style={{
            display: "flex",
            backgroundColor: "#f7f7f7",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ display: "inline-block" }}>{pret} RON</h3>
          <FavouriteButton id={id} />
        </div>
      </Card.Header>
      <Card.Img variant="top" src={imagine} width="100px" height="286px" />
      <Card.Body>
        <Card.Title>{titlu}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Moment fromNow>{data}</Moment>
        </Card.Subtitle>
        <Card.Text>
          {text.length > 150 ? text.slice(0, 146) + "..." : text}
        </Card.Text>
        <Link href={`/anunt/${id}`}>
          <Button variant="primary">Vezi anunt</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        <img
          src="https://www.svgrepo.com/show/100284/auricular-of-phone.svg"
          width="15px"
          height="15px"
        />
        <small className="text-muted ml-2">{contact}</small>
      </Card.Footer>
    </Card>
  );
}
