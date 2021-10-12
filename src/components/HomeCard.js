import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class HomeCard extends Component {
  render() {
    return (
      <div>
        {this.props.languagesArray.map((item) => {
          return (
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Button
                    onClick={() =>
                      this.props.addToFav(item.title, item.imageUrl)
                    }
                    variant="primary"
                  >
                    Add to Fav
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

export default HomeCard;
