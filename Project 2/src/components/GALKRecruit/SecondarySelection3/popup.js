import React from "react";
import "./popup.css";
import { Link, Redirect } from "react-router-dom";

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
              <h2>The date and time of the interview has decided.</h2>
              <div >
              <p>
                <div className="date-1">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="date-2">
                  {this.props.date}
                </div>
                </div>
              </p>
              <hr className="hr-line" />
              </div>
              <div>
              <p>
                <div className="time-1">Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="time-2">
                  {this.props.time}pm ist
                </div>
                </div>
              </p>
              <hr className="hr-line2" />
              </div>
              {/* <button >Approve</button> */}
              <Button text="Approve" to="SecondarySelection4" />
            </div>
          </div>
        )}
        {isOpen && <div className="overlay" />}
      </div>
    );
  }
}

export default InterviewPopup;
