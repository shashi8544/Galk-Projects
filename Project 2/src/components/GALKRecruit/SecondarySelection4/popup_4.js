import React from "react";
import "./popup_4.css";
import { Link, Redirect } from "react-router-dom";
import { deleteConfidentProjects } from "../../../actions/candidateActions";
import Layer from "./images/Layer.png";
const Button = ({ text,to }) => {
  return (
    
    <div >
      <Link to={to}>
    <button>
      {text}
    </button>
  </Link>
      </div>
  );
};

class InterviewPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleModal() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <button onClick={() => this.toggleModal()}>
          Show Interview Details
        </button>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
            <div style={{alignItems:"center",display:'flex',flexDirection:'column'}}>
              <h2>You are not selected for interns by company.</h2>
              <img  src= {Layer}  />
            </div>
            <div className="message_1">
              After careful consideration, 
            </div>
            <div className="message_2">
              we regret to inform you that you have not been selected for the internship.
            </div>
            <div className="message_3">
              You can go back to the first step and try to get internship again!
            </div>
              <Button text="OK" to="SecondarySelection" />
            </div>
          </div>
        )}
        {isOpen && <div className="overlay" />}
      </div>
    );
  }
}

export default InterviewPopup;