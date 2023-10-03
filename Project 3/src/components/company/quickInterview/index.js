import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import "./index.css";
import TextComponent from "./SetTimeSlot";

import DecidedTimeSlot from "./decided-time-slot";
import Result from "./Result";


import { Region } from "../../common/layout/region";
const QuickInterview = () => {
  const [activeButton, setActiveButton] = useState("Button 1");

  useEffect(() => {
    const storedButton = localStorage.getItem("activeButton");
    setActiveButton(storedButton || "Button 1");
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
  };

  return (

    <Router>

      <div>
      <Region>
        <h1 className="heading">Quick Interview</h1>

        <div style={{ display: "flex", marginBottom: "20px", marginLeft:"45px"}}>
          <Link
            to="/Company/QuickInterview/set-time-slot"
            className={`button ${activeButton === "Button 1" ? "active" : ""}`}
            onClick={() => handleButtonClick("Button 1")}

          >
            Set Time Slot
          </Link>
          <Link
            to="/Company/QuickInterview/decided-time-slot"
            className={`button ${activeButton === "Button 2" ? "active" : ""}`}
            onClick={() => handleButtonClick("Button 2")}
          >
            Decided Time Slot
          </Link>
          <Link
            to="/Company/QuickInterview/result"
            className={`button ${activeButton === "Button 3" ? "active" : ""}`}
            onClick={() => handleButtonClick("Button 3")}
          >
            Result
          </Link>

        </div>

        <Route
          path="/Company/QuickInterview/set-time-slot"
          component={TextComponent}

        />
        <Route
          path="/Company/QuickInterview/decided-time-slot"
          component={DecidedTimeSlot}
        />
        <Route path="/Company/QuickInterview/result" component={Result} />
        <Redirect to="/Company/QuickInterview/set-time-slot"></Redirect>
       </Region>
      </div>
    </Router>

  );
};

export default QuickInterview;
