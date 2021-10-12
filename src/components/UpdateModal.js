import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withAuth0 } from "@auth0/auth0-react";

export class UpdateModal extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.handelDisplayModal(this.props.updatedLanguage)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.props.handelUpdate}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={this.props.updatedLanguage.title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  defaultValue={this.props.updatedLanguage.imageUrl}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withAuth0(UpdateModal);
