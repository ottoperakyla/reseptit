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
  mainIngredient,
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
        <Badge color="primary">{mainIngredient}</Badge>
        <Badge color="info">{cookingTime}</Badge>
        <CardText>{description}</CardText>
        {url ? (
          <a href={url}>{url}</a>
        ) : (
          <Link to={`/receipts/${id}`}>
            <Button color="primary">Katso resepti</Button>
          </Link>
        )}
      </CardBody>
    </Card>
  );
};
