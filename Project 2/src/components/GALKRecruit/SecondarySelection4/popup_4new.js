import React from "react";
import "./popup_4new.css";
import { Link, Redirect } from "react-router-dom";
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
              <h2>Congratulations!</h2>
              <img  src= {Layer}  />
            </div>
            <div className="message_31">
            You are selected as intern by company!
             </div>
            <div className="message_11">
            We will send your college offer letter through Email later.
            So Please wait for that.
            </div>
            
              <Button text="OK" to="SecondarySelection6" />
            </div>
          </div>
        )}
        {isOpen && <div className="overlay" />}
      </div>
    );
  }
}

export default InterviewPopup;