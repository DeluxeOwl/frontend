import Card from "react-bootstrap/Card";

import Moment from "react-moment";
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
}) {
  return (
    <Card style={{ width: "22rem" }} border="dark">
      <Card.Header>
        <h3>{pret} RON</h3>
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
        <Button variant="primary">Vezi anunt</Button>
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
