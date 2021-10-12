import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class FavCard extends Component {
  render() {
    return (
      <div>
        {this.props.favLanguagesArray.map((item) => {
          return (
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Button
                    onClick={() => this.props.handelDelete(item._id)}
                    variant="primary"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => this.props.handelDisplayModal(item)}
                    variant="primary"
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default FavCard;
