import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "././MyFavorites.js";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import UpdateModal from "./UpdateModal.js";
import FavCard from "./FavCard.js";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favLanguagesArray: [],
      showModal: false,
      updatedLanguage: {},
    };
  }

  componentDidMount = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER}/favLanguages?email=${this.props.auth0.user.email}`
      )
      .then((results) => {
        this.setState({
          favLanguagesArray: results.data,
        });
      });
  };

  handelDelete = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER}/favLanguages/${_id}`)
      .then((deletedData) => {
        if (deletedData) {
          const newArray = this.state.favLanguagesArray.filter(
            (item) => item._id !== _id
          );
          this.setState({
            favLanguagesArray: newArray,
          });
        }
      });
  };

  handelDisplayModal = (language) => {
    this.setState({
      showModal: !this.state.showModal,
      updatedLanguage: language,
    });
  };

  handelUpdate = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
    };

    await axios
      .put(
        `${process.env.REACT_APP_SERVER}/favLanguages/${this.state.updatedLanguage._id}`,
        body
      )
      .then((updatedData) => {
        const updatedArray = this.state.favLanguagesArray.map((item) => {
          if (item._id === this.state.updatedLanguage._id) {
            item = updatedData.data;
            return item;
          }
          return item;
        });
        this.setState({
          favLanguagesArray: updatedArray,
        });
      });
    this.handelDisplayModal(this.state.updatedLanguage);
  };

  render() {
    console.log(this.state.favLanguagesArray);
    return (
      <>
        <h1>My Favorites</h1>
        <p>This is a collection of my favorites</p>
        <div>
          {this.state.favLanguagesArray ? (
            <FavCard
              favLanguagesArray={this.state.favLanguagesArray}
              handelDisplayModal={this.handelDisplayModal}
              handelDelete={this.handelDelete}
            />
          ) : (
            <h1>Your List is Empty </h1>
          )}
        </div>

        <div>
          {this.state.showModal && (
            <UpdateModal
              showModal={this.state.showModal}
              updatedLanguage={this.state.updatedLanguage}
              handelDisplayModal={this.handelDisplayModal}
              handelUpdate={this.handelUpdate}
            />
          )}
        </div>
      </>
    );
  }
}

export default withAuth0(MyFavorites);
