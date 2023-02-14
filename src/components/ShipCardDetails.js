import React from "react";
import defaultImage from "../img/no_image_available.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ShipCardDetails(props) {
  // Replace image function
  const replaceImage = (error) => {
    error.target.src = defaultImage;
  };

  return (
    <Container className="shipcardDetails">
      <p className="shipcardDetails--title">{props.name}</p>
      <Container className="shipcardDetails--img-container">
        <img
          src={`${props.img}`}
          onError={replaceImage}
          className="shipcardDetails--img"
        />
      </Container>
      <Row>
        <Col>
          <p>
            <strong>MODEL:</strong> {props.model}
          </p>
          <p>
            <strong>STARSHIP CLASS:</strong> {props.starship_class}
          </p>
          <p>
            <strong>MANUFACTURER:</strong> {props.manufacturer}
          </p>
          <p>
            <strong>COST:</strong> {props.cost_in_credits}
          </p>
          <p>
            <strong>CREW:</strong> {props.crew}
          </p>
          <p>
            <strong>PASSENGER CAPACITY:</strong> {props.passengers}
          </p>
        </Col>
        <Col>
          <p>
            <strong>CARGO CAPACITY:</strong> {props.cargo_capacity}
          </p>
          <p>
            <strong>CONSUMABLES:</strong> {props.consumables}
          </p>
          <p>
            <strong>LENGTH:</strong> {props.length}
          </p>
          <p>
            <strong>MAXIMUM ATMOSPHERING SPEED:</strong>{" "}
            {props.max_atmosphering_speed}
          </p>
          <p>
            <strong>HYPERDRIVE RATING:</strong> {props.hyperdrive_rating}
          </p>
          <p>
            <strong>MAXIMUM SPEED IN REALSPACE:</strong> {props.MGLT}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
