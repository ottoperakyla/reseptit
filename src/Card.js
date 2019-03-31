import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Badge
} from "reactstrap";

export default ({
  id,
  title,
  image,
  ingredient,
  cookingTime,
  description,
  url
}) => {
  return (
    <Card className="mb-4">
      {image && <CardImg top width="100%" src={image} alt="Card image cap" />}
      <CardBody>
        <CardTitle>
          {title} [<Link to={`receipt-form/${id}`}>muokkaa</Link>]
        </CardTitle>
        <Badge color="primary">{ingredient}</Badge>
        <Badge color="info">{cookingTime}</Badge>
        <CardText>{description}</CardText>
        <a href={url}>
          <Button color="primary">Katso resepti</Button>
        </a>
      </CardBody>
    </Card>
  );
};
