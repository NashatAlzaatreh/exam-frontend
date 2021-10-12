import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HomeCard from "./HomeCard";

class AllDataAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languagesArray: [],
    };
  }

  componentDidMount = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER}/languages?email=${this.props.auth0.user.email}`
      )
      .then((results) => {
        this.setState({
          languagesArray: results.data,
        });
      });
  };

  addToFav = async (title, imageUrl) => {
    const body = {
      title: title,
      imageUrl: imageUrl,
    };
    await axios.post(`${process.env.REACT_APP_SERVER}/favLanguages`, body);
  };
  render() {
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>
        <HomeCard
          languagesArray={this.state.languagesArray}
          addToFav={this.addToFav}
        />
      </div>
    );
  }

  
}

export default withAuth0(AllDataAPI);
